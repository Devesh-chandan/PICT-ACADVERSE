// Must be first: loads .env before the config modules below read process.env
import "./config/loadEnv.js";
import express from "express";
import cors from "cors";
import { getAllowedOrigins, isVercelPreview } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import adminRoutes from "./routes/admin/index.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import pyqRoutes from "./routes/pyqRoutes.js";

const app = express();
app.disable("x-powered-by");

// CORS - only the known frontends (plus Vercel preview deployments) may call the API.
// Disallowed origins simply get no CORS headers, so the browser blocks the response.
app.use(cors({
  origin: (origin, callback) => {
    const allowed = !origin || getAllowedOrigins().includes(origin) || isVercelPreview(origin);
    callback(null, allowed);
  },
  credentials: true,
}));

app.use(express.json());

// Health check (does not touch the database)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pyqs", pyqRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
