const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User / Partner
const registerCustomer = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Make sure passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};


// Get logged-in User Profile
const getCustomerProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: req.user._id,
      email: req.user.email,
      createdAt: req.user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in User Profile
const getAllCustomers = async (req, res) => {
  try {
    // Find only users whose privacy is set to false
    const users = await User.find({ privacy: false });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No public profiles found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  getAllCustomers
};
