const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    partnerId: { type: String, required: true },
    restaurantName: { type: String, required: true },
    address: { type: String, required: true },
    openAt: { type: String, required: true },
    closeAt: { type: String, required: true },
    premiumTable: { type: String, enum: ["yes", "no"], default: "no" },
    pricePerTable: { type: String, default: "$0" },
    description: { type: String },
    restaurantPhoto: { type: String }, // Cloudinary URL
    secondaryPhoto: { type: String },  // Cloudinary URL

    // 🔹 Optional but useful for your UI:
    totalReservation: { type: Number, default: 0 },
    pendingReservation: { type: Number, default: 0 },
    approvedReservation: { type: Number, default: 0 },
    pendingRevenue: { type: Number, default: 0 }, // in NGN or any currency
    paymentMethod: { type: String, default: "N/A" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
