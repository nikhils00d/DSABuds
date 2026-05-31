const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');
const DailyActivity = require('../models/DailyActivity');

const { processMidnightFines } = require('../services/cronService');

// @route   POST /api/cron/process-fines
// @desc    Run the midnight fine calculation logic (Simulated Cron Job)
// @access  Public (In production, this would be restricted to internal cron services)
router.post('/process-fines', async (req, res) => {
  try {
    // Manually trigger the midnight job
    await processMidnightFines();
    
    res.json({
      message: 'Midnight processing triggered successfully. Check server logs for details.'
    });
  } catch (error) {
    console.error('Manual cron trigger error:', error);
    res.status(500).json({ message: 'Failed to process fines' });
  }
});

module.exports = router;
