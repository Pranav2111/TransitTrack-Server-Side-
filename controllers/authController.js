const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register a new user
exports.signup = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password, userType });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const userData = {
      name: newUser.name,
      email: newUser.email,
      userTypeL: newUser.userType,
    };

    res.status(201).json({ message: 'User created', token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const userData = {
      name: user.name,
      email: user.email,
      userType: user.userType,
    };

    res.json({ message: 'Login successful', token, user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
