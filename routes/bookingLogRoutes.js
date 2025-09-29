const express = require("express");
const bookingLogControllers = require("../controllers/bookingLogControllers");

const router = express.Router();

// /prime-table-admin/bookings
router.post("/", bookingLogControllers.createBookingLog);
router.get("/", bookingLogControllers.getBookingLogs);
router.get("/:id", bookingLogControllers.getBookingLogById);
router.put("/:id", bookingLogControllers.updateBookingLog);
router.delete("/:id", bookingLogControllers.deleteBookingLog);

module.exports = router;
