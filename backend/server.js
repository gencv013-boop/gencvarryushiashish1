// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// -----------------------------
// ⭐ Gemini AI Resume Summary Route
// -----------------------------
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/generate-summary", async (req, res) => {
  const { name, skills, experience, education } = req.body;

  const prompt = `
Write a professional resume summary for:
Name: ${name}
Skills: ${skills}
Experience: ${experience}
Education: ${education}
Tone: professional, concise, impactful.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: prompt }],
    });

    // Extract actual text
    const aiText = response.candidates[0].content.parts[0].text;

    return res.json({ summary: aiText });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: "AI generation failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
