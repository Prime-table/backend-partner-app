const mongoose = require("mongoose");

const latestPartnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  regDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "suspended"],
    default: "pending",
  },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.LatestPartner || mongoose.model("LatestPartner", latestPartnerSchema);
