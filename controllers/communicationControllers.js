const Communication = require("../models/communicationSchema");

// Save or update communication settings
const updateCommunication = async (req, res) => {
  try {
    const { partnerId, emailSettings, smsSettings, pushNotifications } = req.body;

    if (!partnerId) return res.status(400).json({ message: "Partner ID is required" });

    // Upsert: create new record if not exists
    const communication = await Communication.findOneAndUpdate(
      { partnerId },
      { emailSettings, smsSettings, pushNotifications },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Communication settings saved", communication });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error saving communication settings" });
  }
};

// Fetch partner communication settings
const getCommunication = async (req, res) => {
  try {
    const { partnerId } = req.query;

    if (!partnerId) return res.status(400).json({ message: "Partner ID is required" });

    const communication = await Communication.findOne({ partnerId });

    if (!communication) {
      return res.status(404).json({ message: "No communication settings found for this partner" });
    }

    res.status(200).json(communication);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching communication settings" });
  }
};

module.exports = {
  updateCommunication,
  getCommunication,
};
