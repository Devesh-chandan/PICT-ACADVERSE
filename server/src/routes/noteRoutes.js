import express from "express";
import { requireDb } from "../middleware/db.js";
import Note from "../models/Note.js";
import { HttpError, validateObjectId } from "../utils/http.js";

const router = express.Router();

// GET ALL NOTES (public)
router.get("/", requireDb, async (req, res, next) => {
  try {
    res.json(await Note.find().sort({ uploadedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

// Count a download and hand back the file URL (public)
router.post("/:id/download", validateObjectId, requireDb, async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }, { new: true });
    if (!note) throw new HttpError(404, "Note not found");
    res.json({ fileUrl: note.fileUrl, downloads: note.downloads });
  } catch (error) {
    next(error);
  }
});

export default router;
