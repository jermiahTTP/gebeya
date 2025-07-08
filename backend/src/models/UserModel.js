const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone number'],
    unique: true,
    trim: true,
    // Basic validation for Ethiopian phone numbers (e.g., starts with +251 or 09, followed by 8 or 9 digits)
    // This is a simple regex and might need refinement for production.
    match: [/^(?:\+251|0)?9[0-9]{8}$/, 'Please provide a valid Ethiopian phone number']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Do not return password by default
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(10); // Salt rounds, 10-12 is common
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare candidate password with the user's password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
