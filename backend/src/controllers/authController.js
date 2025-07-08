const User = require('../models/UserModel');
const generateToken = require('../utils/jwtUtils');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { name, phoneNumber, password } = req.body;

  try {
    // Basic validation - Mongoose schema will also validate
    if (!phoneNumber || !password) {
      return res.status(400).json({ success: false, message: 'Please provide phone number and password' });
    }

    // Check if user already exists
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this phone number' });
    }

    // Create user
    user = await User.create({
      name,
      phoneNumber,
      password,
      // role will default to 'buyer' as per schema
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send response (excluding password)
    // Note: user.password is not selected by default due to `select: false` in schema
    // To explicitly send user details without password if it were selected:
    // const userResponse = { ...user.toObject() };
    // delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    // Mongoose validation errors (e.g., invalid phone format, password too short)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    // Mongoose duplicate key error (for phoneNumber if somehow race condition bypasses earlier check)
    if (error.code === 11000) {
        return res.status(400).json({ success: false, message: 'Phone number already registered.' });
    }
    console.error('Registration Error:', error); // Log the error for server-side inspection
    res.status(500).json({ success: false, message: 'Server Error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  try {
    // Basic validation
    if (!phoneNumber || !password) {
      return res.status(400).json({ success: false, message: 'Please provide phone number and password' });
    }

    // Check for user
    const user = await User.findOne({ phoneNumber }).select('+password'); // Explicitly select password

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials (user not found)' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials (password mismatch)' });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Send response (excluding password)
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Login Error:', error); // Log the error for server-side inspection
    res.status(500).json({ success: false, message: 'Server Error during login' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  // req.user is set by the protect middleware
  if (!req.user) {
    // This case should ideally be caught by protect middleware, but as a safeguard:
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  // User object (req.user) already excludes password due to UserModel schema or protect middleware logic
  res.status(200).json({
    success: true,
    data: req.user
  });
};
