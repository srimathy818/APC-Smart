// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

// Gemini AI import
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors({
  origin: "https://apc-smart.vercel.app", // allow your frontend
  credentials: true
}));
app.use(express.json());

// --------------------
// Routes
// --------------------

// Root route
app.get("/", (req, res) => {
  res.send("Smart AI Attendance Backend Running ✅");
});

// --------------------
// Gemini AI endpoint
// --------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-message", async (req, res) => {
  try {
    const { name, course } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Write a polite and professional email for ${name} who was absent today in ${course}.
      Keep it formal, caring, and encourage them to attend the next class.
    `;

    const result = await model.generateContent(prompt);

    res.json({ message: result.response.text() });
  } catch (error) {
    console.error("Error generating AI message:", error);
    res.status(500).json({ error: "Failed to generate AI message" });
  }
});

// --------------------
// Zoho Catalyst signup proxy
// --------------------
app.post("/api/auth/catalyst-signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const response = await axios.post(
      "https://appsail-50034992284.development.catalystappsail.in/api/auth/signup",
      { username, password, email },
      {
        headers: {
          "Content-Type": "application/json",
          // "x-api-key": process.env.CATALYST_API_KEY // if needed
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Catalyst signup error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Catalyst signup failed",
    });
  }
});

// --------------------
// MongoDB connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("DB connection failed:", err));

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
