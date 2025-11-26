const express = require('express');


// Create CV
router.post('/', auth, async (req, res) => {
try {
const cv = new CV({ owner: req.user._id, title: req.body.title || 'Untitled', data: req.body.data || {} });
await cv.save();
res.json(cv);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


// List CVs for user
router.get('/', auth, async (req, res) => {
try {
const cvs = await CV.find({ owner: req.user._id }).sort({ updatedAt: -1 });
res.json(cvs);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


// Get CV
router.get('/:id', auth, async (req, res) => {
try {
const cv = await CV.findById(req.params.id);
if (!cv || cv.owner.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Not found' });
res.json(cv);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


// Update CV
router.put('/:id', auth, async (req, res) => {
try {
const cv = await CV.findById(req.params.id);
if (!cv || cv.owner.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Not found' });
cv.title = req.body.title || cv.title;
cv.data = req.body.data || cv.data;
cv.updatedAt = Date.now();
await cv.save();
res.json(cv);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


// Delete
router.delete('/:id', auth, async (req, res) => {
try {
const cv = await CV.findById(req.params.id);
if (!cv || cv.owner.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Not found' });
await cv.remove();
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;