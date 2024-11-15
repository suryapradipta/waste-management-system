const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Null for community-wide announcements
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  notificationType: { type: String, enum: ['pickup reminder', 'announcement'], required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
