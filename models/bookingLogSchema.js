const mongoose = require("mongoose");

const bookingLogSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "cancelled", "suspended"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingLog", bookingLogSchema);
