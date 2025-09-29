const mongoose = require("mongoose");

const EscrowSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    restaurant: { type: String, required: true },
    amount: { type: Number, required: true },
    payoutDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Escrow", EscrowSchema);
