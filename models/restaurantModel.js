const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid"); // import UUID generator

let uuidv4;
(async () => {
  const uuid = await import("uuid");
  uuidv4 = uuid.v4;
})();


const restaurantSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      default: () => uuidv4(), // auto-generate a unique UUID for each restaurant
      unique: true,
      required: true,
    },
    restaurantName: { type: String },
    restaurantAddress: { type: String },
    restaurantCountry: { type: String },
    openAt: { type: String },
    closeAt: { type: String },
    premiumTable: { type: String, enum: ["yes", "no"], default: "no" },
    pricePerTable: { type: String, default: "$0" },
    description: { type: String },
    restaurantRating: { type: String, default: "0.00" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    restaurantPhoto: { type: String }, // Cloudinary URL
    secondaryPhoto: { type: String }, // Cloudinary URL

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
