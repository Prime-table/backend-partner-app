const express = require("express");
const router = express.Router();
const promotionControllers = require("../controllers/promotionControllers");

// Add a promotion
router.post("/", promotionControllers.createPromotion);

// Get all promotions
router.get("/", promotionControllers.getPromotions);

module.exports = router;
