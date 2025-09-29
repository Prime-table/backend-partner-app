const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");

// Update partner password
router.get("/restaurant", RestaurantController.getAllRestaurant);
router.get("/restaurant/:id", RestaurantController.getRestaurantById);

module.exports = router;
