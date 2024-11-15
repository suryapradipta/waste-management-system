const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  issueType: { type: String, enum: ['missed pickup', 'overflowing bin', 'illegal dumping'], required: true },
  description: { type: String, required: true },
  location: { type: String },
  photos: [{ type: String }], // Array of URLs for uploaded photos
  status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
