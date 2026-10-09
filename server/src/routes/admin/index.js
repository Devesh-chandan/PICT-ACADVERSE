import express from "express";
import { requireAdmin } from "../../middleware/admin.js";
import { verifyToken } from "../../middleware/auth.js";
import { requireDb } from "../../middleware/db.js";
import notes from "./notes.js";
import papers from "./papers.js";
import stats from "./stats.js";
import users from "./users.js";

// Everything under /api/admin requires a valid JWT *and* an admin account.
const router = express.Router();
router.use(verifyToken, requireDb, requireAdmin);

router.get("/me", (req, res) => res.json({ user: req.admin }));
router.use("/stats", stats);
router.use("/papers", papers);
router.use("/notes", notes);
router.use("/users", users);

export default router;
