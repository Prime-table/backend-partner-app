const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/user/ratingController");

// Update partner password
router.post("/rating/:id", ratingController.rateRestaurant);


module.exports = router;
