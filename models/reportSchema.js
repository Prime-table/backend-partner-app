// models/reportSchema.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["bookings", "escrow"],
    required: true,
  },
  format: {
    type: String,
    enum: ["csv", "pdf", "excel"],
    required: true,
  },
  filters: {
    type: Object,
    default: {},
  },
  recipientEmail: {
    type: String,
    default: null,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Report || mongoose.model("Report", reportSchema);
