import "dotenv/config"; // ⭐ MOST IMPORTANT LINE
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  status: String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI missing");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const hash = await bcrypt.hash("admin123", 10);

    const existing = await User.findOne({ email: "admin@rajgram.in" });
    if (existing) {
      console.log("⚠️ Boss already exists");
      process.exit(0);
    }

    await User.create({
      name: "Boss Admin",
      email: "admin@rajgram.in",
      password: hash,
      role: "BOSS",
      status: "active"
    });

    console.log("✅ Boss created");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
})();
