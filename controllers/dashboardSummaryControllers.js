const DashboardSummary = require("../models/dashboardSummarySchema");

// Get summary for a partner
const getDashboardSummary = async (req, res) => {
  try {
    const { partnerId } = req.query;
    if (!partnerId) return res.status(400).json({ message: "Partner ID is required" });

    let summary = await DashboardSummary.findOne({ partnerId });

    // fallback if not found
    if (!summary) {
      summary = {
        totalBookings: 0,
        incomingReservations: 0,
        payoutAmount: 0,
        payoutStatus: "pending",
        viewsThisWeek: 0,
      };
    }

    res.status(200).json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching dashboard summary" });
  }
};

// Optional: update summary (e.g., after booking/payment)
const updateDashboardSummary = async (req, res) => {
  try {
    const { partnerId, totalBookings, incomingReservations, payoutAmount, payoutStatus, viewsThisWeek } = req.body;
    if (!partnerId) return res.status(400).json({ message: "Partner ID is required" });

    const summary = await DashboardSummary.findOneAndUpdate(
      { partnerId },
      { totalBookings, incomingReservations, payoutAmount, payoutStatus, viewsThisWeek },
      { new: true, upsert: true }
    );

    res.status(200).json(summary);
  } catch (err) {
    console.error("Update dashboard summary error:", err);
    res.status(500).json({ message: "Server error updating dashboard summary" });
  }
};

module.exports = {
  getDashboardSummary,
  updateDashboardSummary,
};
