const mongoose = require("mongoose");

const profileSettingSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    contactPerson: { type: String },
    password: { type: String, required: true }, // hash for production
  },
  { timestamps: true }
);

const ProfileSetting = mongoose.model("ProfileSetting", profileSettingSchema);

module.exports = ProfileSetting;
