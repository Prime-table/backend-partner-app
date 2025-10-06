const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partnerId: {
      type: String,
      ref: "Restaurant",
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
    partySize: {
      type: Number,
      required: true,
    },
    tableType: {
      type: String,
      enum: ["Window", "Outdoor", "VIP", "Standard"],
      default: "Standard",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ Fix: prevent OverwriteModelError
module.exports = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
