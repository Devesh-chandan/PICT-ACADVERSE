import express from "express";
import { upload } from "../../middleware/upload.js";
import Pyq from "../../models/Pyq.js";
import { storage, assetRef } from "../../services/storage.js";
import {
  HttpError, escapeRegex, isNonEmptyString, paginated, parsePagination, validateObjectId,
} from "../../utils/http.js";

const router = express.Router();

const YEARS = ["1", "2", "3", "4"];
const FOLDER = "acadverse_pyqs";
const MAX_FIELD = 150;

const checkMeta = ({ subject, year, paperType, title }, { partial = false } = {}) => {
  const present = (v) => v !== undefined;
  if (!partial || present(subject)) {
    if (!isNonEmptyString(subject) || subject.length > MAX_FIELD) throw new HttpError(400, "subject is required");
  }
  if (!partial || present(paperType)) {
    if (!isNonEmptyString(paperType) || paperType.length > 50) throw new HttpError(400, "paperType is required");
  }
  if (!partial || present(year)) {
    if (!YEARS.includes(year)) throw new HttpError(400, `year must be one of ${YEARS.join(", ")}`);
  }
  if (present(title) && partial && !isNonEmptyString(title)) throw new HttpError(400, "title cannot be empty");
  if (present(title) && (typeof title !== "string" || title.length > MAX_FIELD)) {
    throw new HttpError(400, "title must be a string of at most 150 characters");
  }
};

// GET /api/admin/papers?search=&year=&paperType=&subject=&page=&limit=
router.get("/", async (req, res, next) => {
  try {
    const { search, year, paperType, subject } = req.query;
    const filter = {};
    if (typeof year === "string" && YEARS.includes(year)) filter.year = year;
    if (isNonEmptyString(paperType)) filter.paperType = paperType;
    if (isNonEmptyString(subject)) filter.subject = subject;
    if (isNonEmptyString(search)) {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ title: rx }, { subject: rx }];
    }

    const pg = parsePagination(req.query);
    const [items, total] = await Promise.all([
      Pyq.find(filter).sort({ uploadedAt: -1 }).skip(pg.skip).limit(pg.limit),
      Pyq.countDocuments(filter),
    ]);
    res.json(paginated(items, total, pg));
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/papers  (multipart: files[], subject, year, paperType, title?)
// Several files can be uploaded at once; they share the same metadata. `title`
// is only honoured for a single file - otherwise each file's own name is used.
router.post("/", upload.array("files", 10), async (req, res, next) => {
  try {
    const files = req.files ?? [];
    if (files.length === 0) throw new HttpError(400, "No file uploaded");
    checkMeta(req.body);

    const customTitle = files.length === 1 && isNonEmptyString(req.body.title) ? req.body.title.trim() : null;
    const created = [];
    const failed = [];

    // Sequential on purpose: keeps memory and Cloudinary concurrency bounded.
    for (const file of files) {
      let asset;
      try {
        asset = await storage.upload(file.buffer, { folder: FOLDER, filename: file.originalname });
        const paper = await Pyq.create({
          subject: req.body.subject.trim(),
          year: req.body.year,
          paperType: req.body.paperType.trim(),
          title: customTitle ?? file.originalname.replace(/\.[^/.]+$/, ""),
          fileUrl: asset.url,
          publicId: asset.publicId,
          resourceType: asset.resourceType,
          uploadedBy: req.admin.id,
        });
        created.push(paper);
      } catch (error) {
        if (asset) await storage.destroy(asset); // don't leave an orphan behind
        console.error("Paper upload failed:", error.message);
        failed.push({ file: file.originalname, error: "Upload failed" });
      }
    }

    if (created.length === 0) return res.status(502).json({ error: "Upload failed", failed });
    res.status(201).json({ created, failed });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/papers/:id  (multipart or JSON; optional `file` replaces the document)
router.patch("/:id", validateObjectId, upload.single("file"), async (req, res, next) => {
  let newAsset;
  try {
    const paper = await Pyq.findById(req.params.id);
    if (!paper) throw new HttpError(404, "Paper not found");

    const body = req.body ?? {};
    checkMeta(body, { partial: true });

    for (const key of ["subject", "paperType", "title"]) {
      if (body[key] !== undefined) paper[key] = body[key].trim();
    }
    if (body.year !== undefined) paper.year = body.year;

    const oldRef = req.file ? assetRef(paper) : null;
    if (req.file) {
      newAsset = await storage.upload(req.file.buffer, { folder: FOLDER, filename: req.file.originalname });
      paper.fileUrl = newAsset.url;
      paper.publicId = newAsset.publicId;
      paper.resourceType = newAsset.resourceType;
    }

    await paper.save();
    if (oldRef) await storage.destroy(oldRef);
    res.json(paper);
  } catch (error) {
    if (newAsset) await storage.destroy(newAsset);
    next(error);
  }
});

// POST /api/admin/papers/bulk-delete  { ids: [...] }  (declared before /:id routes)
router.post("/bulk-delete", async (req, res, next) => {
  try {
    const { ids } = req.body ?? {};
    if (!Array.isArray(ids) || ids.length === 0 || ids.length > 100 || !ids.every((id) => typeof id === "string")) {
      throw new HttpError(400, "ids must be an array of 1-100 ids");
    }
    const papers = await Pyq.find({ _id: { $in: ids } });
    await Pyq.deleteMany({ _id: { $in: papers.map((p) => p._id) } });
    await Promise.all(papers.map((p) => storage.destroy(assetRef(p))));
    res.json({ deleted: papers.length });
  } catch (error) {
    // An id that isn't a valid ObjectId is a client error, not a 500
    if (error.name === "CastError") return next(new HttpError(400, "Invalid id in list"));
    next(error);
  }
});

// DELETE /api/admin/papers/:id
router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const paper = await Pyq.findByIdAndDelete(req.params.id);
    if (!paper) throw new HttpError(404, "Paper not found");
    await storage.destroy(assetRef(paper));
    res.json({ deleted: 1 });
  } catch (error) {
    next(error);
  }
});

export default router;
