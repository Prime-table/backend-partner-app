// models/Card.js
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  partnerId : { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: String, required: true }, // e.g. ₦250,000
  containerBg: { type: String },
  iconBg: { type: String },
  textColor: { type: String },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
