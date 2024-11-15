const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickup.controller');
const auth = require('../middleware/auth'); // JWT middleware

router.get('/schedule', auth, pickupController.getSchedule);
router.post('/schedule', auth, pickupController.schedulePickup);

module.exports = router;
