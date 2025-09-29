const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
   {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      // required: true,
    },
    stars: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "pending", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
