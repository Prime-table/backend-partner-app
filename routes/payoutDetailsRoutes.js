const express = require("express");
const router = express.Router();
const payoutDetailsControllers = require("../controllers/payoutDetailsControllers");

// Update or create payout details
router.put("/update", payoutDetailsControllers.updatePayoutDetails);

// Get payout details
router.get("/", payoutDetailsControllers.getPayoutDetails);

module.exports = router;
