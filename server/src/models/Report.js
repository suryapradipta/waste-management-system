const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportType: { type: String, enum: ['pickup stats', 'issue report', 'recycling rates'], required: true },
  filters: { type: Object, default: {} }, // Filters used for generating the report
  data: { type: mongoose.Schema.Types.Mixed }, // Report data (charts, tables, summaries)
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
