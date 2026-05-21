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

    // GraphQL query to fetch recent submissions
    const query = `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `;

    const response = await axios.post(LEETCODE_API, {
      query,
      variables: { username, limit: 15 }
    });

    const submissions = response.data.data.recentAcSubmissionList;
    
    // Check if there's a submission today (local server time matching)
    // In a real production app, timezones are tricky, we'll use simple UTC Date checking for the MVP.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const todaySubmissions = submissions.filter(sub => {
      const subDate = new Date(sub.timestamp * 1000);
      return subDate >= today;
    });

    const solvedToday = todaySubmissions.length > 0;

    // Update DailyActivity
    let activity = await DailyActivity.findOne({ userId: user._id, date: today });
    
    if (!activity) {
      activity = new DailyActivity({
        userId: user._id,
        date: today,
        solvedQuestions: todaySubmissions.map(s => ({ title: s.title, titleSlug: s.titleSlug, difficulty: 'Unknown' })),
        solvedCount: todaySubmissions.length,
        streakMaintained: solvedToday
      });
    } else {
      activity.solvedQuestions = todaySubmissions.map(s => ({ title: s.title, titleSlug: s.titleSlug, difficulty: 'Unknown' }));
      activity.solvedCount = todaySubmissions.length;
      activity.streakMaintained = solvedToday;
    }
    
    await activity.save();

    // Note: The actual "Daily Cron Job" would run at midnight to check if `streakMaintained` is false 
    // for all users, and apply the Fine Logic (missedDays++, streak = 0, totalFine += (missedDays * 10)).
    // For this sync endpoint, we just return the latest stats.

    res.json({
      message: 'LeetCode data synced successfully',
      solvedToday,
      submissionsToday: todaySubmissions.length,
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
