const AnalyticsSummary = require("../models/analyticsSummarySchema");

// Create a new summary
const createAnalyticsSummary = async (req, res) => {
  try {
    const { totalBookings, topTimeSlot, totalViews, conversionRate } = req.body;

    const newSummary = new AnalyticsSummary({
      totalBookings,
      topTimeSlot,
      totalViews,
      conversionRate,
    });

    await newSummary.save();
    res.status(201).json(newSummary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get latest summary
const getLatestSummary = async (req, res) => {
  try {
    const latest = await AnalyticsSummary.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: "No summary found" });

    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAnalyticsSummary,
  getLatestSummary,
};
