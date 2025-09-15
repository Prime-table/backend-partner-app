const mongoose = require("mongoose");

const payoutDetailsSchema = new mongoose.Schema(
  {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountHolder: { type: String, required: true },
    paymentFrequency: { type: String, required: true },
  },
  { timestamps: true }
);

const PayoutDetails = mongoose.model("PayoutDetails", payoutDetailsSchema);

module.exports = PayoutDetails;
