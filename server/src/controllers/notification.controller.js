const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from JWT middleware

    // Fetch notifications for the user
    const notifications = await Notification.find({ userId }).sort({ sentAt: -1 }); // Latest first

    res.json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
