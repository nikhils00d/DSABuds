const cron = require('node-cron');
const axios = require('axios');
const User = require('../models/User');
const Group = require('../models/Group');
const DailyActivity = require('../models/DailyActivity');

const LEETCODE_API = 'https://leetcode.com/graphql';

const syncUserLeetCode = async (user, date) => {
  if (!user.leetcodeUsername) return false;
  
  try {
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
      variables: { username: user.leetcodeUsername, limit: 15 }
    });

    const submissions = response.data.data.recentAcSubmissionList;
    
    // Set the start and end of the provided date in UTC
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const targetSubmissions = submissions.filter(sub => {
      const subDate = new Date(sub.timestamp * 1000);
      return subDate >= startOfDay && subDate <= endOfDay;
    });

    const solvedToday = targetSubmissions.length > 0;

    let activity = await DailyActivity.findOne({ userId: user._id, date: startOfDay });
    
    if (!activity) {
      activity = new DailyActivity({
        userId: user._id,
        date: startOfDay,
        solvedQuestions: targetSubmissions.map(s => ({ title: s.title, titleSlug: s.titleSlug, difficulty: 'Unknown' })),
        solvedCount: targetSubmissions.length,
        streakMaintained: solvedToday
      });
    } else {
      activity.solvedQuestions = targetSubmissions.map(s => ({ title: s.title, titleSlug: s.titleSlug, difficulty: 'Unknown' }));
      activity.solvedCount = targetSubmissions.length;
      activity.streakMaintained = solvedToday;
    }
    
    await activity.save();
    return solvedToday;

  } catch (error) {
    console.error(`Error syncing LeetCode for ${user.username}:`, error.message);
    return false; // Fail safe to false if API fails, though in production you might want a retry mechanism
  }
};

const processMidnightFines = async () => {
  console.log('[CRON] Starting midnight LeetCode sync and fine calculation...');
  
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Normalize to start of today (the day that just ended)
  // Note: Depending on your server's timezone vs UTC, you might want to adjust this.
  // For simplicity, we are assuming UTC day boundaries.

  try {
    const users = await User.find().populate('joinedGroups');
    
    for (const user of users) {
      // 1. Force sync their LeetCode stats for today just in case they didn't login today
      let solvedToday = false;
      if (user.leetcodeUsername) {
        solvedToday = await syncUserLeetCode(user, today);
      } else {
        // If they don't have a linked account, check if they somehow logged an activity (manual overrides, etc)
        const activity = await DailyActivity.findOne({ userId: user._id, date: today });
        solvedToday = activity ? activity.streakMaintained : false;
      }

      // 2. Process their streak and fines
      if (solvedToday) {
        user.streak += 1;
        user.missedDays = 0;
      } else {
        user.streak = 0;
        user.missedDays += 1;
        
        // Fine is ₹10 per consecutive missed day
        const dailyFine = user.missedDays * 10;
        user.totalFine += dailyFine;

        if (user.joinedGroups && user.joinedGroups.length > 0) {
          const groupIds = user.joinedGroups.map(g => g._id);
          await Group.updateMany(
              { _id: { $in: groupIds } },
              { $inc: { groupFund: dailyFine } }
          );
        }
      }

      await user.save();
    }
    
    console.log('[CRON] Finished midnight calculations successfully!');
  } catch (err) {
    console.error('[CRON] Error during midnight processing:', err);
  }
};

// Schedule the task to run every day at 23:59 (11:59 PM) system time
cron.schedule('59 23 * * *', () => {
  processMidnightFines();
});

module.exports = {
  processMidnightFines,
  syncUserLeetCode
};
