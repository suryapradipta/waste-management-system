const express = require('express');
const auth = require("../middleware/auth");
const {generateReport} = require("../controllers/report.controller");
const router = express.Router();

// Route to generate reports
router.post('/generate', auth, generateReport);

module.exports = router;
