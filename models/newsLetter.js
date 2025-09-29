const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate signups
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);
