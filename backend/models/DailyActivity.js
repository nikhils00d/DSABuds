const mongoose = require('mongoose');

const dailyActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  solvedQuestions: [{
    title: String,
    titleSlug: String,
    difficulty: String
  }],
  solvedCount: {
    type: Number,
    default: 0
  },
  streakMaintained: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Ensure unique entry per user per day
dailyActivitySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyActivity', dailyActivitySchema);
