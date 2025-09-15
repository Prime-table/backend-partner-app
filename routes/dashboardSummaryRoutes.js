const express = require("express");
const router = express.Router();
const dashboardSummaryControllers = require("../controllers/dashboardSummaryControllers");

// Get dashboard summary for a partner
router.get("/dashboard-summary", dashboardSummaryControllers.getDashboardSummary);

// Optional: update dashboard summary
router.put("/dashboard-summary", dashboardSummaryControllers.updateDashboardSummary);

module.exports = router;
