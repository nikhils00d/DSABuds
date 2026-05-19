const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Group = require('../models/Group');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Utility to generate a random 7-character alphanumeric code
const generateGroupCode = () => {
  return crypto.randomBytes(4).toString('hex').slice(0, 7).toUpperCase();
};

// @route POST /api/groups/create
// @desc Create a new accountability group
// @access Private
router.post('/create', auth, async (req, res) => {
  try {
    const { groupName } = req.body;

    if (!groupName) {
      return res.status(400).json({ message: 'Group name is required' });
    }

    // Generate unique invite code
    let groupCode;
    let isUnique = false;
    while (!isUnique) {
      groupCode = generateGroupCode();
      const existingGroup = await Group.findOne({ groupCode });
      if (!existingGroup) isUnique = true;
    }

    const newGroup = new Group({
      groupName,
      groupCode,
      members: [req.user.id],
      createdBy: req.user.id
    });

    const savedGroup = await newGroup.save();

    // Add group to user's joinedGroups
    await User.findByIdAndUpdate(req.user.id, {
      $push: { joinedGroups: savedGroup._id }
    });

    res.status(201).json(savedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route POST /api/groups/join
// @desc Join an existing group using the invite code
// @access Private
router.post('/join', auth, async (req, res) => {
  try {
    const { groupCode } = req.body;

    if (!groupCode) {
      return res.status(400).json({ message: 'Group code is required' });
    }

    const group = await Group.findOne({ groupCode: groupCode.toUpperCase() });
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is already a member
    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already a member of this group' });
    }

    // Add user to group
    group.members.push(req.user.id);
    await group.save();

    // Add group to user's joinedGroups
    await User.findByIdAndUpdate(req.user.id, {
      $push: { joinedGroups: group._id }
    });

    res.json({ message: 'Successfully joined group', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route GET /api/groups/:id
// @desc Get group details and leaderboard
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('members', 'username leetcodeUsername streak missedDays totalFine');
    
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Ensure only members can view the group
    const isMember = group.members.some(member => member._id.toString() === req.user.id);
    if (!isMember) {
      return res.status(403).json({ message: 'Not authorized to view this group' });
    }

    // Sort members for leaderboard (highest streak first, then lowest fine)
    const leaderboard = group.members.sort((a, b) => {
      if (b.streak !== a.streak) {
        return b.streak - a.streak;
      }
      return a.totalFine - b.totalFine;
    });

    res.json({
      _id: group._id,
      groupName: group.groupName,
      groupCode: group.groupCode,
      groupFund: group.groupFund,
      leaderboard
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
