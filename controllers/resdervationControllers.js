const Reservation = require("../models/reservationSchema");

// @desc Get all reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// @desc Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { date, time, size, name, table, status } = req.body;

    const newReservation = new Reservation({
      date,
      time,
      size,
      name,
      table,
      status,
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// @desc Update reservation (status, etc.)
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Reservation.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Reservation not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
};

// @desc Delete reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Reservation not found" });

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
};

module.exports = {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
