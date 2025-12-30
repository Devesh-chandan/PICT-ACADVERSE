// server/routes/pyqRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Pyq from '../models/Pyq.js';

const router = express.Router();

// 1. Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    // Create folder if it doesn't exist
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Unique filename: fieldname-timestamp.ext
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET Routes (Keep existing search logic)
router.get('/', async (req, res) => {
    // ... (Keep your existing GET logic from the previous guide)
    try {
        const { subject, year, type, difficulty, search } = req.query;
        let query = {};
        if (subject && subject !== 'All') query.code = subject;
        if (year && year !== 'All') query.year = parseInt(year);
        if (type && type !== 'All') query.type = type;
        if (difficulty && difficulty !== 'All') query.difficulty = difficulty;

        if (search) {
            query.$or = [
                { question: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } }
            ];
        }
        const pyqs = await Pyq.find(query).sort({ createdAt: -1 });
        res.json(pyqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST Route - NOW WITH FILE UPLOAD
// 'file' matches the name attribute in the frontend form
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Create full URL for the uploaded file
    const fileUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    const newPyq = new Pyq({
      ...req.body, // Text fields (subject, year, etc.)
      fileUrl: fileUrl, // Save the generated URL
      // If user didn't provide a "question" text, use the filename or a default
      question: req.body.question || `Question Paper - ${req.body.subject} ${req.body.year}` 
    });

    const savedPyq = await newPyq.save();
    res.status(201).json(savedPyq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;