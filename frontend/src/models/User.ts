import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["BOSS", "LEADER"], required: true },
    slug: { type: String }, // only for leader
    status: { type: String, default: "active" }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
