// // server/index.js
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url'; // Needed for __dirname in ES modules
// import pyqRoutes from './routes/pyqRoutes.js';

// dotenv.config();

// // Fix for ES Modules to get __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // SERVE STATIC FILES (The "uploads" folder)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/pyqs', pyqRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Pyq from "./models/Pyq.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Config (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("DB Error:", err));

// --- ROUTES ---

// 1. GET ALL PAPERS
app.get("/api/pyqs", async (req, res) => {
  try {
    const pyqs = await Pyq.find().sort({ uploadedAt: -1 });
    res.json(pyqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. UPLOAD PAPER
app.post("/api/pyqs", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Cloudinary Stream
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cldRes = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "examorbit_pyqs"
    });

    // Save to DB
    const newPyq = new Pyq({
      subject: req.body.subject,
      year: req.body.year,
      paperType: req.body.paperType,
      title: req.body.title || req.file.originalname,
      fileUrl: cldRes.secure_url,
    });

    await newPyq.save();
    res.status(201).json(newPyq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));