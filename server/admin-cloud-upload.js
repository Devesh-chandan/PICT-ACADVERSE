import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Pyq from './models/Pyq.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

// --- 1. SETUP & CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- 2. ADD YOUR NEW FILES HERE ---
const papersToAdd = [
  {
    filename: "SY_S&S_25-26_Assignment_6.pdf", // Make sure this file is in server/uploads/
    subject: "Data Structures & Algorithms",
    code: "DSA",
    year: 2024,
    type: "End-Sem",
    module: 5,
    difficulty: "Hard",
    faculty: "Prof. ABC",
    question: "SS"
  },
  // Copy-paste the block above to add more papers...
];

const uploadPapers = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    let successCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (const paper of papersToAdd) {
      try {
        console.log(`Processing: ${paper.filename}...`);

        // A. Check if file exists locally
        const localFilePath = path.join(__dirname, 'uploads', paper.filename);
        if (!fs.existsSync(localFilePath)) {
          console.error(`   ❌ File not found in 'uploads' folder! Skipping.`);
          failCount++;
          continue;
        }

        // B. Check if already uploaded (prevent duplicates)
        // We check if the 'question' title or the exact filename already exists
        const existingPaper = await Pyq.findOne({ 
           $or: [{ question: paper.question }, { fileUrl: { $regex: paper.filename } }] 
        });

        if (existingPaper) {
          console.log(`   ⚠️  Already exists in DB. Skipping.`);
          skipCount++;
          continue;
        }

        // C. Upload to Cloudinary
        console.log(`   ☁️  Uploading to Cloudinary...`);
        const result = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
          folder: "examorbit_pyqs"
        });

        // D. Save to MongoDB
        const newPyq = new Pyq({
          ...paper,
          fileUrl: result.secure_url
        });

        await newPyq.save();
        console.log(`   ✅ Success! Saved to Database.`);
        successCount++;

      } catch (err) {
        console.error(`   ❌ Error processing this file:`, err.message);
        failCount++;
      }
      console.log('-----------------------------------');
    }

    console.log(`\n🎉 SUMMARY:`);
    console.log(`   Uploaded: ${successCount}`);
    console.log(`   Skipped:  ${skipCount}`);
    console.log(`   Failed:   ${failCount}`);
    
    process.exit();

  } catch (error) {
    console.error('❌ Critical Database Error:', error);
    process.exit(1);
  }
};

uploadPapers();