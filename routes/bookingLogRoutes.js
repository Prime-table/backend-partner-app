const express = require("express");
const bookingLogControllers = require("../controllers/bookingLogControllers");

const router = express.Router();

// /prime-table-admin/bookings
router.post("/create-booking", bookingLogControllers.createBookingLog);
router.get("/bookings", bookingLogControllers.getBookingLogs);
router.get("/bookings/:id", bookingLogControllers.getBookingLogById);
router.put("/update-bookings/:id", bookingLogControllers.updateBookingLog);
router.delete("/delete-bookings/:id", bookingLogControllers.deleteBookingLog);

module.exports = router;
