const Promotion = require("../models/promotionSchema");

const createPromotion = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const promotion = new Promotion({
      title,
      description,
      startDate,
      endDate,
    });

    await promotion.save();
    res.status(201).json({ message: "Promotion created successfully", promotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating promotion" });
  }
};

const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().sort({ createdAt: -1 });
    res.status(200).json(promotions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching promotions" });
  }
};

module.exports = {
  createPromotion,
  getPromotions,
};

