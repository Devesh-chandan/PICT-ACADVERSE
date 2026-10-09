import express from "express";
import { requireDb } from "../middleware/db.js";
import Pyq from "../models/Pyq.js";

const router = express.Router();

// GET ALL PAPERS (public). Uploading, editing and deleting papers is admin-only
// and lives under /api/admin/papers.
router.get("/", requireDb, async (req, res, next) => {
  try {
    const pyqs = await Pyq.find().sort({ uploadedAt: -1 });
    res.json(pyqs);
  } catch (error) {
    next(error);
  }
});

export default router;
