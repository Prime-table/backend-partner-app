const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register Partner
const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const partnerExists = await User.findOne({ email });
    if (partnerExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const partner = new User({ email, password });
    partner.confirmPassword = confirmPassword; // set virtual field
    await partner.save();

    res.status(201).json({
      _id: partner._id,
      email: partner.email,
      token: generateToken(partner._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login Partner
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const partner = await User.findOne({ email });
    if (partner && (await partner.matchPassword(password))) {
      res.json({
        _id: partner._id,
        email: partner.email,
        token: generateToken(partner._id),
        partnerId: partner.partnerId
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout Partner
const logoutUser = async (req, res) => {
  try {
    // If you’re using httpOnly cookies for tokens, you would clear the cookie here.
    // For localStorage-based tokens, frontend clears it itself.
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in partner profile
const getUserProfile = async (req, res) => {
  try {
    if (!req.partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.json({
      _id: req.partner._id,
      email: req.partner.email,
      createdAt: req.partner.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
};


