import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";
import { getJwtSecret } from "../config/env.js";
import { verifyToken } from "../middleware/auth.js";
import { requireDb } from "../middleware/db.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 72; // bcrypt ignores everything past 72 bytes
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

// Helper: Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
};

// 1. EMAIL/PASSWORD REGISTER
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body ?? {};

  // Typeof checks also stop NoSQL-operator payloads such as { "email": { "$ne": null } }
  if (!isNonEmptyString(name) || !isNonEmptyString(email) || typeof password !== "string") {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    return res.status(400).json({
      error: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`,
    });
  }
  next();
};

router.post("/register", validateRegister, requireDb, async (req, res, next) => {
  try {
    const name = req.body.name.trim();
    const email = req.body.email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });

    await newUser.save();

    res.status(201).json({ token: generateToken(newUser), user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      // Two simultaneous registrations raced past the findOne check
      return res.status(400).json({ error: "User already exists" });
    }
    next(error);
  }
});

// 2. EMAIL/PASSWORD LOGIN
const validateLogin = (req, res, next) => {
  const { email, password } = req.body ?? {};
  if (!isNonEmptyString(email) || typeof password !== "string" || password.length === 0) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  next();
};

router.post("/login", validateLogin, requireDb, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    // Same response for "no such user" and "wrong password" so accounts cannot be enumerated
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // If user registered via Google, they might not have a password
    if (!user.password) {
      return res.status(400).json({ error: "Please login with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ token: generateToken(user), user });
  } catch (error) {
    next(error);
  }
});

// 3. GOOGLE LOGIN
const validateGoogle = (req, res, next) => {
  if (!isNonEmptyString(req.body?.token)) {
    return res.status(400).json({ error: "Google token is required" });
  }
  next();
};

router.post("/google", validateGoogle, requireDb, async (req, res) => {
  try {
    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub: googleId, email, name, picture, email_verified } = ticket.getPayload();

    // Linking by email is only safe when Google vouches that the address is verified
    if (!email || !email_verified) {
      return res.status(401).json({ error: "Google account email is not verified" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.picture = picture || user.picture;
        await user.save();
      }
    } else {
      user = new User({ name, email, googleId, picture });
      await user.save();
    }

    res.json({ token: generateToken(user), user });
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(401).json({ error: "Invalid Google Token" });
  }
});

// 4. CURRENT USER - lets the client refresh role/profile (e.g. after being promoted to admin)
router.get("/me", verifyToken, requireDb, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ error: "Account no longer exists" });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
