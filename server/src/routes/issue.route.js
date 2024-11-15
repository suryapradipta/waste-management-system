const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const auth = require('../middleware/auth'); // Middleware for token validation

// Route to report an issue
router.post('/report', auth, issueController.reportIssue);

module.exports = router;
