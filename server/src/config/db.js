import mongoose from "mongoose";

let connecting = null;

// MONGO_DB_NAME picks the database inside the cluster; without it the name in MONGO_URI is used.
const connectOptions = () => (process.env.MONGO_DB_NAME ? { dbName: process.env.MONGO_DB_NAME } : {});

// Resolves when connected, throws if the connection cannot be established.
// Safe to call on every request (serverless cold starts, dropped connections).
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  if (!connecting) {
    connecting = mongoose
      .connect(process.env.MONGO_URI, connectOptions())
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
        connecting = null; // allow a retry on the next request
        throw err;
      });
  }
  await connecting;
};
