const Analytics = require("../models/analyticsSchema");

// Create new analytics entry
const createAnalytics = async (req, res) => {
  try {
    const { date, bookings } = req.body;

    if (!date || bookings == null) {
      return res.status(400).json({ message: "Date and bookings are required" });
    }

    const newAnalytics = new Analytics({ date, bookings });
    await newAnalytics.save();

    res.status(201).json(newAnalytics);
  } catch (error) {
    res.status(500).json({ message: "Error creating analytics", error });
  }
};

// Get all analytics entries
const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ createdAt: 1 }); // chronological
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error });
  }
};

module.exports = {
  createAnalytics,
  getAnalytics,
};
