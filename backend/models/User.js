const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  leetcodeUsername: {
    type: String,
    trim: true
  },
  githubUsername: {
    type: String,
    trim: true,
    default: ''
  },
  linkedinUsername: {
    type: String,
    trim: true,
    default: ''
  },
  streak: {
    type: Number,
    default: 0
  },
  missedDays: {
    type: Number,
    default: 0
  },
  totalFine: {
    type: Number,
    default: 0
  },
  currentGroup: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    default: null
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
