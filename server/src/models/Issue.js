const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  issueType: { type: String, enum: ['missed pickup', 'overflowing bin', 'illegal dumping'], required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  additionalComments: { type: String },
  photos: [{ type: String }], // URLs to uploaded photos
  status: { type: String, enum: ['NEW', 'IN_PROGRESS', 'RESOLVED'], default: 'NEW' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
