import { connectDB } from "../config/db.js";

// Ensures a database connection exists before a handler touches a model.
export const requireDb = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Error:", err.message);
    res.status(503).json({ error: "Database unavailable. Please try again shortly." });
  }
};
