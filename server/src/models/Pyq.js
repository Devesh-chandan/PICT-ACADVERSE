import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  year: { type: String, required: true }, // "1", "2", etc.
  paperType: { type: String, required: true }, // "End-Sem", "In-Sem"
  title: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Cloudinary URL
  publicId: { type: String }, // Cloudinary public id (absent on legacy documents)
  resourceType: { type: String }, // Cloudinary resource type: image | raw | video
  uploadedBy: { type: String }, // User id of the uploader (optional for backwards compatibility)
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: { createdAt: false, updatedAt: true } });

pyqSchema.index({ year: 1, subject: 1 });

export default mongoose.model("Pyq", pyqSchema);
