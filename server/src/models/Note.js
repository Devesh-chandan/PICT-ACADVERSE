import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  subject: { type: String, required: true, trim: true, maxlength: 100 },
  author: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, trim: true, maxlength: 500, default: "" },
  pages: { type: Number, min: 0, default: 0 },
  fileUrl: { type: String, required: true },
  publicId: { type: String },
  resourceType: { type: String },
  downloads: { type: Number, default: 0, min: 0 },
  uploadedBy: { type: String },
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: { createdAt: false, updatedAt: true } });

noteSchema.index({ subject: 1 });

export default mongoose.model("Note", noteSchema);
