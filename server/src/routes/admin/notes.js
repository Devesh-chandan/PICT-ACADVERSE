import express from "express";
import { upload } from "../../middleware/upload.js";
import Note from "../../models/Note.js";
import { storage, assetRef } from "../../services/storage.js";
import {
  HttpError, escapeRegex, isNonEmptyString, paginated, parsePagination, validateObjectId,
} from "../../utils/http.js";

const router = express.Router();

const FOLDER = "acadverse_notes";

const checkText = (value, field, max, { required }) => {
  if (value === undefined && !required) return;
  if (required || value !== "") {
    if (!isNonEmptyString(value) || value.length > max) {
      throw new HttpError(400, `${field} is required (max ${max} characters)`);
    }
  }
};

const parsePages = (value) => {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > 5000) throw new HttpError(400, "pages must be a whole number between 0 and 5000");
  return n;
};

// GET /api/admin/notes?search=&subject=&page=&limit=
router.get("/", async (req, res, next) => {
  try {
    const { search, subject } = req.query;
    const filter = {};
    if (isNonEmptyString(subject)) filter.subject = subject;
    if (isNonEmptyString(search)) {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ title: rx }, { subject: rx }, { author: rx }];
    }
    const pg = parsePagination(req.query);
    const [items, total] = await Promise.all([
      Note.find(filter).sort({ uploadedAt: -1 }).skip(pg.skip).limit(pg.limit),
      Note.countDocuments(filter),
    ]);
    res.json(paginated(items, total, pg));
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/notes  (multipart: file, title, subject, author, description?, pages?)
router.post("/", upload.single("file"), async (req, res, next) => {
  let asset;
  try {
    if (!req.file) throw new HttpError(400, "No file uploaded");
    const b = req.body;
    checkText(b.title, "title", 150, { required: true });
    checkText(b.subject, "subject", 100, { required: true });
    checkText(b.author, "author", 80, { required: true });
    checkText(b.description, "description", 500, { required: false });
    const pages = parsePages(b.pages);

    asset = await storage.upload(req.file.buffer, { folder: FOLDER, filename: req.file.originalname });
    const note = await Note.create({
      title: b.title.trim(),
      subject: b.subject.trim(),
      author: b.author.trim(),
      description: b.description?.trim() ?? "",
      pages,
      fileUrl: asset.url,
      publicId: asset.publicId,
      resourceType: asset.resourceType,
      uploadedBy: req.admin.id,
    });
    res.status(201).json(note);
  } catch (error) {
    if (asset) await storage.destroy(asset);
    next(error);
  }
});

// PATCH /api/admin/notes/:id  (optional `file` replaces the document)
router.patch("/:id", validateObjectId, upload.single("file"), async (req, res, next) => {
  let newAsset;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) throw new HttpError(404, "Note not found");

    const b = req.body ?? {};
    checkText(b.title, "title", 150, { required: false });
    checkText(b.subject, "subject", 100, { required: false });
    checkText(b.author, "author", 80, { required: false });
    checkText(b.description, "description", 500, { required: false });
    const pages = parsePages(b.pages);

    for (const key of ["title", "subject", "author"]) {
      if (b[key] !== undefined) note[key] = b[key].trim();
    }
    if (b.description !== undefined) note.description = b.description.trim();
    if (pages !== undefined) note.pages = pages;

    const oldRef = req.file ? assetRef(note) : null;
    if (req.file) {
      newAsset = await storage.upload(req.file.buffer, { folder: FOLDER, filename: req.file.originalname });
      note.fileUrl = newAsset.url;
      note.publicId = newAsset.publicId;
      note.resourceType = newAsset.resourceType;
    }

    await note.save();
    if (oldRef) await storage.destroy(oldRef);
    res.json(note);
  } catch (error) {
    if (newAsset) await storage.destroy(newAsset);
    next(error);
  }
});

// DELETE /api/admin/notes/:id
router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) throw new HttpError(404, "Note not found");
    await storage.destroy(assetRef(note));
    res.json({ deleted: 1 });
  } catch (error) {
    next(error);
  }
});

export default router;
