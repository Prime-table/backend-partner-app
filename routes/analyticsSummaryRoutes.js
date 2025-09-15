const express = require("express");
const router = express.Router();
const analyticsSummaryControllers = require("../controllers/analyticsSummaryControllers");

// Add new summary metrics
router.post("/", analyticsSummaryControllers.createAnalyticsSummary);

// Get latest summary metrics
router.get("/", analyticsSummaryControllers.getLatestSummary);

module.exports = router;
