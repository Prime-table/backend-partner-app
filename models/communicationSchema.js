const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    required: true,
    unique: true,
  },
  emailSettings: {
    promotions: { type: Boolean, default: false },
    bookings: { type: Boolean, default: false },
    system: { type: Boolean, default: false },
  },
  smsSettings: {
    promotions: { type: Boolean, default: false },
    bookings: { type: Boolean, default: false },
    system: { type: Boolean, default: false },
  },
  pushNotifications: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Communication", communicationSchema);
