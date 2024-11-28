const Notification = require('../models/Notification');
const User = require('../models/User');

// Fetch notifications for the logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from JWT middleware

    // Fetch notifications for the user
    const notifications = await Notification.find({ userId }).sort({ sentAt: -1 }); // Latest first

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications available.' });
    }


    res.json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.json({ message: 'Notification marked as read.', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.broadcastAnnouncement = async (req, res) => {
  try {
    const { communityId } = req.user; // Assume admin token includes communityId
    const { message } = req.body;

    console.log('communityId:', communityId);

    if (!message) {
      return res.status(400).json({ message: 'Message is required.' });
    }



    const communityUsers = await User.find({ communityId });

    const notifications = communityUsers.map((user) => ({
      userId: user._id,
      communityId,
      notificationType: 'announcement',
      message
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({ message: 'Announcement broadcasted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

