const mongoose = require("mongoose");

const AnalyticsSummarySchema = new mongoose.Schema({
  totalBookings: {
    type: Number,
    default: 0,
  },
  topTimeSlot: {
    type: String,
    default: "N/A",
  },
  totalViews: {
    type: Number,
    default: 0,
  },
  conversionRate: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AnalyticsSummary", AnalyticsSummarySchema);
