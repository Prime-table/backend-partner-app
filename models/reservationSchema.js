const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    size: { type: Number, required: true },
    name: { type: String, required: true },
    table: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
