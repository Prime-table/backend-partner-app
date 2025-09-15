const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  address: { type: String, required: true },
  openAt: { type: String, required: true },
  closeAt: { type: String, required: true },
  premiumTable: { type: String, enum: ["yes", "no"], default: "no" },
  pricePerTable: { type: String, default: "$0" },
  description: { type: String },
  restaurantPhoto: { type: String }, // Cloudinary URL
  secondaryPhoto: { type: String }, // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
