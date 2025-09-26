const express = require("express");
const dashboardControllers = require("../controllers/dashboardControllers");
const { authMiddleware, partnerMiddleware }  = require("../middleware/authMiddleware")
const router = express.Router();

// fetch all dashboard data (bookings + cards)
router.get("/:id", partnerMiddleware, dashboardControllers.getDashboardData);

// create a new booking
router.post("/bookings",  authMiddleware, dashboardControllers.createBooking);

// get all bookings
router.get("/bookings",  authMiddleware, dashboardControllers.getBookings);

// create a new card
router.post("/cards",  authMiddleware, dashboardControllers.createCard);

// get all cards
router.get("/cards",  authMiddleware, dashboardControllers.getCards);

module.exports = router;
