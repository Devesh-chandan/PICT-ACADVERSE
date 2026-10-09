// One-time (and safe to re-run) project setup:  npm run setup
//
//   1. checks that .env is filled in
//   2. connects to MongoDB and creates the collections' indexes
//   3. verifies the Cloudinary credentials
//   4. creates the admin account from ADMIN_EMAIL / ADMIN_PASSWORD (or promotes that email if it already exists)
//
// Pass --reset-password to overwrite an existing admin's password with ADMIN_PASSWORD.
import "../src/config/loadEnv.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cloudinary from "../src/config/cloudinary.js";
import { connectDB } from "../src/config/db.js";
import { getMissingConfig } from "../src/config/env.js";
import Note from "../src/models/Note.js";
import Pyq from "../src/models/Pyq.js";
import User from "../src/models/user.js";

const MIN_ADMIN_PASSWORD = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const step = (message) => console.log(`\n> ${message}`);
const ok = (message) => console.log(`  ok   ${message}`);
const warn = (message) => console.log(`  warn ${message}`);

const checkConfig = () => {
  const missing = getMissingConfig();
  if (missing.length) {
    throw new Error(`Fill these in .env first: ${missing.join(", ")}`);
  }
  ok("required variables are set");
};

const createIndexes = async () => {
  // Emails used to be stored as typed; the schema now lowercases them, so fix older accounts first.
  for (const user of await User.collection.find({ email: /[A-Z]/ }).toArray()) {
    try {
      await User.collection.updateOne({ _id: user._id }, { $set: { email: user.email.trim().toLowerCase() } });
    } catch {
      warn(`could not lowercase ${user.email} (another account already uses that address)`);
    }
  }

  for (const model of [User, Pyq, Note]) {
    await model.createCollection();
    await model.syncIndexes();
    ok(`collection "${model.collection.name}" ready`);
  }
};

const checkCloudinary = async () => {
  await cloudinary.api.ping();
  ok(`connected to Cloudinary account "${process.env.CLOUDINARY_CLOUD_NAME}"`);
};

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Admin";

  if (!email || !password) {
    warn("ADMIN_EMAIL / ADMIN_PASSWORD not set, skipping admin account");
    return;
  }
  if (!EMAIL_RE.test(email)) throw new Error("ADMIN_EMAIL is not a valid email address");
  if (password.length < MIN_ADMIN_PASSWORD) throw new Error(`ADMIN_PASSWORD must be at least ${MIN_ADMIN_PASSWORD} characters`);

  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });
    ok(`admin account created for ${email}`);
    return;
  }

  existing.role = "admin";
  if (process.argv.includes("--reset-password")) {
    existing.password = await bcrypt.hash(password, 10);
    ok(`${email} is an admin and its password was reset`);
  } else {
    ok(`${email} is an admin (existing password kept, use --reset-password to change it)`);
  }
  await existing.save();
};

try {
  step("Checking configuration");
  checkConfig();
  step("Connecting to MongoDB");
  await connectDB();
  ok(`database "${mongoose.connection.name}"`);
  await createIndexes();
  step("Checking Cloudinary");
  await checkCloudinary();
  step("Admin account");
  await seedAdmin();
  console.log("\nSetup complete.");
} catch (error) {
  console.error(`\nSetup failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
