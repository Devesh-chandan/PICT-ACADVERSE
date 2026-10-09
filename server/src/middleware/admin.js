import User from "../models/user.js";

// Must run after verifyToken and requireDb. The role is read from the database
// on every request (not from the JWT) so demoting an admin takes effect at once.
export const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("role name email");
    if (!user) return res.status(401).json({ error: "Account no longer exists" });
    if (user.role !== "admin") return res.status(403).json({ error: "Admin access required" });
    req.admin = user;
    next();
  } catch (error) {
    next(error);
  }
};
