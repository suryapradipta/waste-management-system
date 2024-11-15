const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    fullName: {type: String, required: true},
    contactNumber: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    communityId: {type: mongoose.Schema.Types.ObjectId, ref: 'Community'},
    address: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
