import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// If your model file is still .js, keep the extension. If it's .ts, remove it.
import Pyq from './models/Pyq.js'; 
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

// --- TYPE DEFINITIONS ---
interface PaperConfig {
  filename: string;
  subject: string;
  year: string;
  paperType: string;
  title: string;
}

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- FILES TO UPLOAD ---
// Put your PDF files inside a folder named 'uploads' in the same directory as this script
const papersToAdd: PaperConfig[] = [
  {
    filename: "exp 5 print 1.pdf",  
    subject: "Computer Organisation and Architecture (COA)",      
    year: "2",                            
    paperType: "In-Sem",                 
    title: "In Sem 2024 - Dec"           
  }
];

const uploadPapers = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in .env");
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    for (const paper of papersToAdd) {
      try {
        console.log(`Processing: ${paper.filename}...`);
        const localFilePath = path.join(__dirname, 'uploads', paper.filename);

        // 1. Check if file exists locally
        if (!fs.existsSync(localFilePath)) {
          console.error(`  ❌ File not found locally: ${localFilePath}`);
          continue;
        }

        // 2. Remove old DB entry to avoid duplicates
        const existing = await Pyq.findOne({ subject: paper.subject, title: paper.title });
        if (existing) {
          console.log(`  🔄 Removing old DB entry...`);
          await Pyq.deleteOne({ _id: existing._id });
        }

        // 3. Prepare Clean Filename (Sanitize)
        // "final exp5-2 (1).pdf" -> "final_exp5-2_1"
        const cleanName: string = paper.filename
          .replace(/\.[^/.]+$/, "")       
          .replace(/[^a-zA-Z0-9]/g, "_"); 

        // 4. Upload to Cloudinary
        console.log(`  ☁️  Uploading to Cloudinary as '${cleanName}'...`);
        
        // Explicitly cast result to UploadApiResponse for better type safety
        const result: UploadApiResponse = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",      
          folder: "examorbit_pyqs",
          public_id: cleanName,       // Forces clean name
          use_filename: true,        
          unique_filename: false,     // FALSE = Keeps URL clean
          overwrite: true             
        });

        // 5. Save to MongoDB
        const newPyq = new Pyq({
          subject: paper.subject,
          year: paper.year,
          paperType: paper.paperType,
          title: paper.title,
          fileUrl: result.secure_url, 
          uploadedAt: new Date()
        });

        await newPyq.save();
        console.log(`  ✅ Upload Success!`);
        console.log(`  🔗 Link: ${result.secure_url}`);

      } catch (err: any) {
        console.error(`  ❌ Error processing ${paper.filename}: ${err.message}`);
      }
      console.log('-----------------------------------');
    }
    
    console.log("🎉 All operations completed.");
    process.exit();

  } catch (error) {
    console.error('❌ Fatal Error:', error);
    process.exit(1);
  }
};

uploadPapers();