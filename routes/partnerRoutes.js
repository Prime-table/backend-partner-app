const express = require("express");
const router = express.Router();
const partnersControllers = require("../controllers/partnersControllers");

// Update or create payout details
router.get("/getallpartners", partnersControllers.getAllPartners);
router.get("/partnerapproval", partnersControllers.partnersApproval);


module.exports = router;
