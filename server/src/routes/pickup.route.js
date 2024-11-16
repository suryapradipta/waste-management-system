const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickup.controller');
const auth = require('../middleware/auth'); // JWT middleware

router.get('/schedule', auth, pickupController.getSchedule);
router.post('/schedule', auth, pickupController.schedulePickup);
router.get('/history', auth, pickupController.getPickupHistory);
router.get('/waste-over-time', auth, pickupController.getPickupChartData);
module.exports = router;
