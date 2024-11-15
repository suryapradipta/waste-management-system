const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  pickupDate: { type: Date, required: true },
  wasteTypes: [{ type: String, enum: ['household', 'recyclable', 'hazardous'], required: true }],
  address: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'completed'], default: 'scheduled' }
});

module.exports = mongoose.model('Pickup', pickupSchema);
