import multer from "multer";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

// Memory storage (the file is streamed on to Cloudinary), bounded in size and type.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 10 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.has(file.mimetype)) return cb(null, true);
    const err = new Error("Only PDF, JPG, PNG or WEBP files are allowed");
    err.status = 400;
    cb(err);
  },
});
