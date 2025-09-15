// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  booking_id: { type: String, required: true, unique: true },
  date: { type: String, required: true }, // keep as string (yyyy-mm-dd)
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Paid", "In escrow"], required: true },
  withdrawal_earnings: { type: String, default: "" },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
