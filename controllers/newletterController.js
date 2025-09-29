const Newsletter = require("../models/newsLetter");

// @desc   Sign up for newsletter
// @route  POST /api/newsletter/signup
// @access Public
exports.signUpNewsletter = async (req, res) => {
  try {
    const { firstname, email } = req.body;

    // Basic validation
    if (!firstname || !email) {
      return res.status(400).json({
        success: false,
        error: "Firstname and Email are required",
      });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: "Email already subscribed",
      });
    }

    // Create new subscription
    const subscription = await Newsletter.create({ firstname, email });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to the newsletter",
      data: subscription,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
