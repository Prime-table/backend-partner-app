const Booking = require("../models/bookingSchema");
const Card = require("../models/cardSchema");
const Reservation = require("../models/reservationSchema");

// 📌 Get dashboard data
const getDashboardData = async (req, res) => {


  const { id } = req.params

  try {
    const bookings = await Booking.find({ partnerId : id });
    const reservation = await Reservation.find({ partnerId : id })


    res.json({ bookings, reservation });
  } catch (err) {
    console.error("Dashboard fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};

//  Create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Create booking error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Create a new card
const createCard = async (req, res) => {
  try {
    const newCard = new Card(req.body);
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    console.error("Create card error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

//Get Cards
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDashboardData,
  createBooking,
  createCard,
  getBookings,
  getCards,
};
