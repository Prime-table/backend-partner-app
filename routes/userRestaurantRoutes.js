const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");

// Update partner password
router.get("/menus", RestaurantController.getAllRestaurant);
router.get("/menus/:id", RestaurantController.getRestaurantById);

module.exports = router;
