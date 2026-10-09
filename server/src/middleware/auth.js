import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/env.js";

// JWT Authentication Middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    req.user = jwt.verify(token, getJwtSecret()); // { id, email, role }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
