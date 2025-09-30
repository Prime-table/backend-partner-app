const express = require("express");
const reservationControllers = require("../controllers/reservationControllers");

const router = express.Router();

router.get("/:id", reservationControllers.getReservations);

router.post("/:id", reservationControllers.getBookings);
router.get("/allbookings", reservationControllers.getAllBookings);
// router.put("/:id", reservationControllers.updateReservation);
// router.delete("/:id", reservationControllers.deleteReservation);

module.exports = router;
s