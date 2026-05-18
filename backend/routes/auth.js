const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route POST /api/auth/signup
// @desc Register a user
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, leetcodeUsername } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      passwordHash,
      leetcodeUsername: leetcodeUsername || ''
    });

    const savedUser = await newUser.save();

    // Create JWT payload
    const payload = { id: savedUser._id, username: savedUser.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        leetcodeUsername: savedUser.leetcodeUsername
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route POST /api/auth/login
// @desc Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        leetcodeUsername: user.leetcodeUsername,
        streak: user.streak,
        totalFine: user.totalFine
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
