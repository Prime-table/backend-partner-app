const Rating = require("../models/ratingModel");

// @desc   Rate a restaurant
// @route  POST /api/restaurants/:restaurantId/ratings
exports.rateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { stars, comment } = req.body;

    if (!stars) {
      return res.status(400).json({
        success: false,
        error: "userId and stars are required",
      });
    }

    // Create or update rating (upsert ensures one rating per user per restaurant)
    const rating = await Rating.findOneAndUpdate(
      { id },
      { stars, comment },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      data: rating,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   Get all ratings for a restaurant
// @route  GET /api/restaurants/:restaurantId/ratings
exports.getRestaurantRatings = async (req, res) => {
  try {
    const { id } = req.params;

    const ratings = await Rating.find({ id })
      .populate("userId", "firstname email");

    res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   Get average rating for a restaurant
// @route  GET /api/restaurants/:restaurantId/ratings/average
exports.getRestaurantAverageRating = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Rating.aggregate([
      { $match: { id } },
      { $group: { _id: "$restaurantId", avgStars: { $avg: "$stars" }, count: { $sum: 1 } } },
    ]);

    if (!result.length) {
      return res.status(200).json({ success: true, avgStars: 0, count: 0 });
    }

    res.status(200).json({
      success: true,
      avgStars: result[0].avgStars,
      count: result[0].count,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
