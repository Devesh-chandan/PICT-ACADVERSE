import mongoose from "mongoose";

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

export const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Reads `?page` and `?limit` (default 20, max 100). */
export const parsePagination = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

export const paginated = (items, total, { page, limit }) => ({
  items,
  total,
  page,
  limit,
  pages: Math.max(Math.ceil(total / limit), 1),
});

/** Express param middleware: rejects malformed ids with 400 instead of a CastError 500. */
export const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  next();
};

/** Parses "true"/"false"/boolean form values; returns undefined when absent. */
export const parseBool = (v) => {
  if (v === undefined) return undefined;
  if (typeof v === "boolean") return v;
  return String(v).toLowerCase() === "true";
};
