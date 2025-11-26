const mongoose = require('mongoose');
const CVSchema = new mongoose.Schema({
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, default: 'My Resume' },
data: { type: Object, default: {} }, // whole CV JSON (personal, education, experience, skills)
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('CV', CVSchema);