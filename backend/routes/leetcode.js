const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const DailyActivity = require('../models/DailyActivity');

// LeetCode GraphQL endpoint
const LEETCODE_API = 'https://leetcode.com/graphql';

// @route   GET /api/leetcode/sync
// @desc    Sync user's LeetCode recent submissions and update streak/fines
// @access  Private
router.get('/sync', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.leetcodeUsername) {
      return res.status(400).json({ message: 'LeetCode username not linked' });
    }

    const username = user.leetcodeUsername;

    // GraphQL query to fetch recent submissions and current streak
    const query = `
      query leetcodeSync($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }
        matchedUser(username: $username) {
          userCalendar {
            streak
          }
        }
      }
    `;

    const response = await axios.post(LEETCODE_API, {
      query,
      variables: { username, limit: 15 }
    });

    const submissions = response.data.data.recentAcSubmissionList;
    const leetcodeStreak = response.data.data.matchedUser?.userCalendar?.streak || 0;
    
    // Group all recent submissions by day (UTC)
    const dailyData = {};
    for (const sub of submissions) {
      const subDate = new Date(sub.timestamp * 1000);
      subDate.setUTCHours(0, 0, 0, 0);
      const dateKey = subDate.toISOString();
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: subDate,
          submissions: []
        };
      }
      dailyData[dateKey].submissions.push(sub);
    }

    // Upsert DailyActivity for each day found in recent submissions
    for (const dateKey in dailyData) {
      const { date, submissions: daySubs } = dailyData[dateKey];
      let activity = await DailyActivity.findOne({ userId: user._id, date: date });
      
      if (!activity) {
        activity = new DailyActivity({
          userId: user._id,
          date: date,
          solvedQuestions: daySubs.map(s => ({ title: s.title, titleSlug: s.titleSlug, difficulty: 'Unknown' })),
          solvedCount: daySubs.length,
          streakMaintained: true
        });
      } else {
        activity.solvedQuestions = daySubs.map(s => ({ title: s.title, titleSlug: s.titleSlug, difficulty: 'Unknown' }));
        activity.solvedCount = daySubs.length;
        activity.streakMaintained = true;
      }
      await activity.save();
    }
    
    // Use the official streak from LeetCode API directly
    if (user.streak !== leetcodeStreak) {
      user.streak = leetcodeStreak;
      // We don't reset fines here, fines are handled by cron.
      await user.save();
    }
    
    // Check if there's a submission today (local server time matching) for the response flag
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const solvedToday = dailyData[today.toISOString()] && dailyData[today.toISOString()].submissions.length > 0;

    // Note: The actual "Daily Cron Job" would run at midnight to check if `streakMaintained` is false 
    // for all users, and apply the Fine Logic (missedDays++, streak = 0, totalFine += (missedDays * 10)).
    // For this sync endpoint, we dynamically calculate the correct streak.

    res.json({
      message: 'LeetCode data synced successfully',
      solvedToday,
      streak: user.streak,
      submissionsToday: dailyData[today.toISOString()] ? dailyData[today.toISOString()].submissions.length : 0,
      recentSubmissions: submissions
    });

  } catch (error) {
    console.error('LeetCode API Error:', error);
    res.status(500).json({ message: 'Failed to fetch data from LeetCode' });
  }
});

// @route   POST /api/leetcode/link
// @desc    Link LeetCode username to account
// @access  Private
router.post('/link', auth, async (req, res) => {
  try {
    const { leetcodeUsername } = req.body;
    if (!leetcodeUsername) return res.status(400).json({ message: 'Username is required' });

    const user = await User.findByIdAndUpdate(req.user.id, { leetcodeUsername }, { new: true });
    res.json({ message: 'LeetCode account linked', user: { leetcodeUsername: user.leetcodeUsername } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
