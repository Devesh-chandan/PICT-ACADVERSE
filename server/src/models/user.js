import mongoose from "mongoose";

// One collection holds every account; `role` separates students from admins.
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String }, // bcrypt hash; absent for Google-only accounts
  googleId: { type: String, unique: true, sparse: true }, // sparse: accounts without Google don't collide
  picture: { type: String },
  role: { type: String, enum: ["student", "admin"], default: "student", index: true },
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    // Never serialise the password hash into API responses
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
});

export default mongoose.model("User", UserSchema);
