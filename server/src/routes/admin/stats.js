import express from "express";
import Note from "../../models/Note.js";
import Pyq from "../../models/Pyq.js";
import User from "../../models/user.js";

const router = express.Router();

const DAY_MS = 24 * 60 * 60 * 1000;

// GET /api/admin/stats
router.get("/", async (req, res, next) => {
  try {
    const weekAgo = new Date(Date.now() - 7 * DAY_MS);
    const [
      papers, notes, users, admins, newUsers,
      papersByYear, papersByType, topNotes, recentPapers, recentNotes,
    ] = await Promise.all([
      Pyq.countDocuments(),
      Note.countDocuments(),
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ createdAt: { $gte: weekAgo } }),
      Pyq.aggregate([{ $group: { _id: "$year", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
      Pyq.aggregate([{ $group: { _id: "$paperType", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Note.find().sort({ downloads: -1 }).limit(5).select("title subject downloads"),
      Pyq.find().sort({ uploadedAt: -1 }).limit(5),
      Note.find().sort({ uploadedAt: -1 }).limit(5),
    ]);

    res.json({
      totals: { papers, notes, users, admins, newUsers },
      papersByYear: papersByYear.map((r) => ({ year: r._id, count: r.count })),
      papersByType: papersByType.map((r) => ({ paperType: r._id, count: r.count })),
      topNotes,
      recent: { papers: recentPapers, notes: recentNotes },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
