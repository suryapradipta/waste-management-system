const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const auth = require('../middleware/auth'); // JWT middleware for authentication

// Route to fetch notifications
router.get('/', auth, notificationController.getNotifications);

module.exports = router;
