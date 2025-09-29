const Restaurant = require("../models/restaurantSchema");

// @desc   Get all menus
// @route  GET /api/menus
// @access Public (you can secure later with auth)
exports.getAllRestaurant = async (req, res) => {
  try {
    const menus = await Restaurant.find();
    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};


// @desc    Get single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

     const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error("Get Restaurant Error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
