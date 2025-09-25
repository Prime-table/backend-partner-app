const AdminSettings = require("../models/adminSettingSchema");

// Get notification settings
const getNotificationSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }
    res.json(settings.notifications);
  } catch (error) {
    console.error("Error fetching notification settings:", error);
    res.status(500).json({ message: "Error fetching notification settings", error });
  }
};

// Update notification settings
const updateNotificationSettings = async (req, res) => {
  try {
    const updates = req.body; // expected structure: { partnerApprovals: true, ... }

    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }

    settings.notifications = { ...settings.notifications, ...updates };
    await settings.save();

    res.json({ message: "Notification settings updated successfully", notifications: settings.notifications });
  } catch (error) {
    console.error("Error updating notification settings:", error);
    res.status(500).json({ message: "Error updating notification settings", error });
  }
};

module.exports = {
  getNotificationSettings,
  updateNotificationSettings,
};
