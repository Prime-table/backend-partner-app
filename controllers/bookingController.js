const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Restaurant = require("../../models/partner/restaurantSchema");

// @desc   Create a new booking for a restaurant
// @route  POST /api/restaurants/:restaurantId/bookings
// @access Public (secure with auth if needed)
exports.createBooking = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { userId, date, time, partySize, tableType } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid restaurant ID",
      });
    }

    // Ensure restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: "Restaurant not found",
      });
    }

    // Basic validation
    if (!userId || !date || !time || !partySize) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields (userId, date, time, partySize)",
      });
    }

    const booking = await Booking.create({
      userId,
      restaurantId,  // <-- Link to restaurant
      date,
      time,
      partySize,
      tableType,
    });

    res.status(201).json({
      success: true,
      message: "Booking successful",
      data: booking,
    });
  } catch (err) {
    console.error("Create Booking Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   Get all bookings (admin only)
// @route  GET /api/bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "firstname email")
      .populate("restaurantId", "name city");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    console.error("Get All Bookings Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   Get booking history (upcoming & past) for a user
// @route  GET /api/bookings/history/:userId
exports.getBookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date();

    // Past = booking date < today
    const pastBookings = await Booking.find({
      userId,
      date: { $lt: today },
    })
      .populate("restaurantId", "name city")
      .sort({ date: -1, time: -1 });

    // Upcoming = booking date >= today
    const upcomingBookings = await Booking.find({
      userId,
      date: { $gte: today },
    })
      .populate("restaurantId", "name city")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      upcoming: upcomingBookings,
      past: pastBookings,
    });
  } catch (err) {
    console.error("Get Booking History Error:", err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
