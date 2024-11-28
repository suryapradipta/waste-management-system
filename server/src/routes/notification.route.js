const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const auth = require('../middleware/auth');
const isAdmin = require("../middleware/admin");

// Route to fetch notifications
router.get('/', auth, notificationController.getNotifications);

// Broadcast announcement
router.post('/broadcast', auth, isAdmin, notificationController.broadcastAnnouncement);

// Mark notification as read
router.patch('/:notificationId/read', auth, notificationController.markNotificationAsRead);

module.exports = router;
