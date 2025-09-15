const mongoose = require("mongoose");

const dashboardSummarySchema = new mongoose.Schema({
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true },
  totalBookings: { type: Number, default: 0 },
  incomingReservations: { type: Number, default: 0 },
  payoutAmount: { type: Number, default: 0 },
  payoutStatus: { type: String, default: "pending" },
  viewsThisWeek: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("DashboardSummary", dashboardSummarySchema);
