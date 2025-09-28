const Reservation = require("../models/reservationSchema");

// @desc Get all reservations for a partner
const getReservations = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const reservations = await Reservation.find({ partnerId: id });
    res.json(reservations);

  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// @desc Create a new reservation for a partner
const createReservation = async (req, res) => {
  try {
    const { partnerId } = req.params;

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const { date, time, size, name, table, status } = req.body;

    const newReservation = new Reservation({
      partnerId,
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

// @desc Update a reservation
const updateReservation = async (req, res) => {
  try {
    const { partnerId, id } = req.params;

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const updated = await Reservation.findOneAndUpdate(
      { _id: id, partnerId }, // ensure only partner’s reservation can be updated
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Reservation not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating reservation", error });
  }
};

// @desc Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const { partnerId, id } = req.params;

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const deleted = await Reservation.findOneAndDelete({ _id: id, partnerId });

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
