import multer from "multer";

export const notFound = (req, res) => {
  res.status(404).json({ error: "Not found" });
};

// Express identifies error handlers by their 4-argument signature
export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ error: err.code === "LIMIT_FILE_SIZE" ? "File too large (max 20 MB)" : err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: Object.values(err.errors).map((e) => e.message).join("; ") });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  if (err.status && err.status < 500) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
