const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');
const DailyActivity = require('../models/DailyActivity');

// @route   POST /api/cron/process-fines
// @desc    Run the midnight fine calculation logic (Simulated Cron Job)
// @access  Public (In production, this would be restricted to internal cron services)
router.post('/process-fines', async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const users = await User.find().populate('joinedGroups');

    let processedUsers = 0;
    let totalFinesIssued = 0;

    for (const user of users) {
      // Find today's activity
      const activity = await DailyActivity.findOne({ userId: user._id, date: today });
      
      const solvedToday = activity ? activity.streakMaintained : false;

      if (solvedToday) {
        // User solved a problem today!
        user.streak += 1;
        user.missedDays = 0; // Reset consecutive misses
      } else {
        // User missed today!
        user.streak = 0;
        user.missedDays += 1;

        // Dynamic Fine System Logic: Day 1 = ₹10, Day 2 = ₹20, etc.
        const dailyFine = user.missedDays * 10;
        user.totalFine += dailyFine;
        totalFinesIssued += dailyFine;

        // Distribute the fine to all joined groups
        if (user.joinedGroups.length > 0) {
            // Split the fine equally among groups? Or full fine to each group?
            // The PRD says "Added positively to group fund". Let's add the dailyFine to all groups they are in.
            const groupIds = user.joinedGroups.map(g => g._id);
            await Group.updateMany(
                { _id: { $in: groupIds } },
                { $inc: { groupFund: dailyFine } }
            );
        }
      }

      await user.save();
      processedUsers++;
    }

    res.json({
      message: 'Daily fines and streaks processed successfully',
      stats: {
        processedUsers,
        totalFinesIssued
      }
    });

  } catch (error) {
    console.error('Cron job error:', error);
    res.status(500).json({ message: 'Failed to process fines' });
  }
});

module.exports = router;
