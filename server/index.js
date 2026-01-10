


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Pyq from "./models/Pyq.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes); // Auth Middleware

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
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
  }
};

// Call connectDB on every request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

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
export default app;