import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js"; // ✅ make sure the path is correct

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected for seeding ✅"))
  .catch((err) => console.error("DB connection failed:", err));

const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({ username: "APCM" });
    if (existing) {
      console.log("Admin already exists ✅");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("apcmcs", 10);

    const admin = new Admin({
      username: "APCM",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Default admin seeded successfully ✅");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedAdmin();
