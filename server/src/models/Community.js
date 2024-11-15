const mongoose = require('mongoose');
require('mongoose-unique-validator');
const communitySchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  pickupSchedule: [{
    day: {type: String, required: true}, // e.g., "Monday"
    time: {type: String, required: true} // e.g., "9:00 AM"
  }],
  adminId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Community', communitySchema);
