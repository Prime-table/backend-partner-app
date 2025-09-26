const  DashboardSummary = require ("../models/dashboardSummarySchema.js");

// Get summary for a partner
const getDashboardSummary = async (req, res) => {
  try {
    const { partnerId } = req.params; // 👈 get from URL params

    

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    let summary = await DashboardSummary.findOne({ partnerId });

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
    console.error("Get Dashboard Summary Error:", err);
    res.status(500).json({ message: "Server error fetching dashboard summary" });
  }
};

// Update summary
const updateDashboardSummary = async (req, res) => {
  try {
    const { partnerId } = req.params; // 👈 get from URL params

    if (!partnerId) {
      return res.status(400).json({ message: "Partner ID is required" });
    }

    const { totalBookings, incomingReservations, payoutAmount, payoutStatus, viewsThisWeek } = req.body;

    const summary = await DashboardSummary.findOneAndUpdate(
      { partnerId },
      { totalBookings, incomingReservations, payoutAmount, payoutStatus, viewsThisWeek },
      { new: true, upsert: true }
    );

    res.status(200).json(summary);
  } catch (err) {
    console.error("Update Dashboard Summary Error:", err);
    res.status(500).json({ message: "Server error updating dashboard summary" });
  }
};

module.exports = { getDashboardSummary, updateDashboardSummary };
