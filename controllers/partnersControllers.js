const Partner = require("../models/Partner");

// @desc   Get all menus
// @route  GET /api/menus
// @access Public (you can secure later with auth)
exports.getAllPartners = async (req, res) => {
  try {
    const menus = await Partner.find();
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
