const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  notificationType: { type: String, enum: ['issue_report', 'general', 'pickup_reminder', 'announcement'], required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false } // Track if the user has read the notification
});

module.exports = mongoose.model('Notification', notificationSchema);
