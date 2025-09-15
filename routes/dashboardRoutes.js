const express = require("express");
const dashboardControllers = require("../controllers/dashboardControllers");
const router = express.Router();

// fetch all dashboard data (bookings + cards)
router.get("/", dashboardControllers.getDashboardData);

// create a new booking
router.post("/bookings", dashboardControllers.createBooking);

// get all bookings
router.get("/bookings", dashboardControllers.getBookings);

// create a new card
router.post("/cards", dashboardControllers.createCard);

// get all cards
router.get("/cards", dashboardControllers.getCards);

module.exports = router;
