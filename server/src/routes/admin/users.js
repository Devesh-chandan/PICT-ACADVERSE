import express from "express";
import User from "../../models/user.js";
import {
  HttpError, escapeRegex, isNonEmptyString, paginated, parsePagination, validateObjectId,
} from "../../utils/http.js";

const router = express.Router();

const ROLES = ["student", "admin"];

// GET /api/admin/users?search=&role=&page=&limit=
router.get("/", async (req, res, next) => {
  try {
    const { search, role } = req.query;
    const filter = {};
    if (ROLES.includes(role)) filter.role = role;
    if (isNonEmptyString(search)) {
      const rx = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ name: rx }, { email: rx }];
    }
    const pg = parsePagination(req.query);
    const [items, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(pg.skip).limit(pg.limit),
      User.countDocuments(filter),
    ]);
    res.json(paginated(items, total, pg));
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/users/:id  { role }
router.patch("/:id", validateObjectId, async (req, res, next) => {
  try {
    const { role } = req.body ?? {};
    if (!ROLES.includes(role)) throw new HttpError(400, `role must be one of ${ROLES.join(", ")}`);

    const user = await User.findById(req.params.id);
    if (!user) throw new HttpError(404, "User not found");

    if (user.role === "admin" && role !== "admin") {
      if (user.id === req.admin.id) throw new HttpError(400, "You cannot remove your own admin access");
      // Defence in depth for races / data fixes: there must always be an admin left
      if ((await User.countDocuments({ role: "admin" })) <= 1) throw new HttpError(400, "At least one admin must remain");
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/users/:id
router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    if (req.params.id === req.admin.id) throw new HttpError(400, "You cannot delete your own account");

    const user = await User.findById(req.params.id);
    if (!user) throw new HttpError(404, "User not found");
    if (user.role === "admin" && (await User.countDocuments({ role: "admin" })) <= 1) {
      throw new HttpError(400, "At least one admin must remain");
    }

    await user.deleteOne();
    res.json({ deleted: 1 });
  } catch (error) {
    next(error);
  }
});

export default router;
