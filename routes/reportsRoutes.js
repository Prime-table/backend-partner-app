// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportControllers = require("../controllers/reportControllers");

// Preview reports
router.get("/bookings", reportControllers.getBookingsReport);
router.get("/escrow", reportControllers.getEscrowReport);

// Export reports
router.post("/export", reportControllers.exportReport);

// Send reports by email
router.post("/email", reportControllers.sendReportEmail);

module.exports = router;
