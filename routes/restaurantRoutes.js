const express = require("express");
const restaurantController = require("../controllers/RestaurantControllers");

const router = express.Router();

router.post("/create", restaurantController.createRestuarant);
router.get("/all-restaurants", restaurantController.getAllRestaurant);
// router.get("/profile/:id", profileControllers.getProfileById);
// router.put("/profile/:id", profileControllers.updateProfile);
// router.delete("/profile/:id", profileControllers.deleteProfile);

module.exports = router;
