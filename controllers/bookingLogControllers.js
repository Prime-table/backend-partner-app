const BookingLog = require("../models/bookingLogSchema");

// Create a booking log
const createBookingLog = async (req, res) => {
  try {
    const booking = new BookingLog(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all booking logs
const getBookingLogs = async (req, res) => {
  try {
    const bookings = await BookingLog.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking log by ID
const getBookingLogById = async (req, res) => {
  try {
    const booking = await BookingLog.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking log
const updateBookingLog = async (req, res) => {
  try {
    const booking = await BookingLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking log
const deleteBookingLog = async (req, res) => {
  try {
    const booking = await BookingLog.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBookingLog,
  getBookingLogs,
  getBookingLogById,
  updateBookingLog,
  deleteBookingLog,
};
