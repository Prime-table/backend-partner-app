const express = require("express");
const reservationControllers = require("../controllers/resdervationControllers");

const router = express.Router();

router.get("/", reservationControllers.getReservations);
router.post("/", reservationControllers.createReservation);
router.put("/:id", reservationControllers.updateReservation);
router.delete("/:id", reservationControllers.deleteReservation);

module.exports = router;
