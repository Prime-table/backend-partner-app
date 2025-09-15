const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: String, // e.g., "July", "Aug"
      required: true,
    },
    bookings: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
