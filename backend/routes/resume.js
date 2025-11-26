const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const auth = require("../middleware/auth");

// Create Resume
router.post("/", auth, async (req, res) => {
  try {
    const resume = await Resume.create({ ...req.body, userId: req.user.id });
    res.status(201).json(resume);
  } catch (err) { res.status(500).json(err); }
});

// Get User Resumes
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;
