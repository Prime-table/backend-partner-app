const express = require("express");
const router = express.Router();
const analyticsControllers = require("../controllers/analyticsControllers");

router.post("/", analyticsControllers.createAnalytics); // Add data
router.get("/", analyticsControllers.getAnalytics);     // Fetch data

module.exports = router;
