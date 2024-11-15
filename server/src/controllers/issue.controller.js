const Issue = require('../models/Issue');
const Notification = require('../models/Notification'); // Assuming notifications are tracked

// Report an issue
exports.reportIssue = async (req, res) => {
  try {
    const { userId, communityId } = req.user;
    const { issueType, location, description, additionalComments, photos } = req.body;

    if (!issueType) return res.status(400).json({ message: 'Issue type is required.' });
    if (!location || !description) return res.status(400).json({ message: 'Location and description are required.' });

    // Create a new issue
    const issue = new Issue({
      userId,
      communityId,
      issueType,
      location,
      description,
      additionalComments,
      photos
    });
    await issue.save();

    // Create a notification for the user
    const notification = new Notification({
      userId,
      communityId,
      notificationType: 'issue_report', // Ensure this matches the schema enum
      message: `Your issue has been reported successfully. Issue ID: ${issue._id}`,
    });
    await notification.save();

    res.status(201).json({ message: 'Issue reported successfully.', issueId: issue._id, status: issue.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
