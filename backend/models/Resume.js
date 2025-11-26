const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  template: { type: String, required: true },
  data: { type: Object, required: true },
}, { timestamps: true });

// Fix for OverwriteModelError
module.exports = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
