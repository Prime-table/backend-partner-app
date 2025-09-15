const PayoutDetails = require("../models/payoutDetailsSchema");

// Update or create payout details
const updatePayoutDetails = async (req, res) => {
  try {
    const { bankName, accountNumber, accountHolder, paymentFrequency } = req.body;

    if (!bankName || !accountNumber || !accountHolder || !paymentFrequency) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    let payout = await PayoutDetails.findOne({ accountNumber });

    if (payout) {
      payout.bankName = bankName;
      payout.accountHolder = accountHolder;
      payout.paymentFrequency = paymentFrequency;
      await payout.save();
      return res.status(200).json({ message: "Payout details updated", payout });
    }

    payout = new PayoutDetails({ bankName, accountNumber, accountHolder, paymentFrequency });
    await payout.save();
    res.status(201).json({ message: "Payout details created", payout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating payout details" });
  }
};

// Get payout details by account number
const getPayoutDetails = async (req, res) => {
  try {
    const { accountNumber } = req.query; // /api/payout?accountNumber=1234567890
    if (!accountNumber) return res.status(400).json({ message: "Account number is required" });

    const payout = await PayoutDetails.findOne({ accountNumber });
    if (!payout) return res.status(404).json({ message: "Payout details not found" });

    res.status(200).json(payout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching payout details" });
  }
};

module.exports = {
  updatePayoutDetails,
  getPayoutDetails,
};
