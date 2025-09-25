const AdminSettings = require("../models/adminSettingSchema");

// Get settings
const createSettings = async (req, res) => {
  try {
    const { siteName, maintenanceMode, contactEmail } = req.body; // adapt to your schema

    let settings = await AdminSettings.findOne();

    if (!settings) {
      // Create new settings document
      settings = await AdminSettings.create({
        siteName,
        maintenanceMode,
        contactEmail,
      });
    } else {
      // Update existing settings
      settings.siteName = siteName;
      settings.maintenanceMode = maintenanceMode;
      settings.contactEmail = contactEmail;
      await settings.save();
    }

    res.json({ message: "Settings saved successfully", settings });
  } catch (error) {
    console.error("Error saving settings:", error);
    res.status(500).json({ message: "Error saving settings", error });
  }
};

// Update settings by section
const updateSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }

    const { section, data } = req.body;

    if (!section || !data) {
      return res.status(400).json({ message: "Section and data required" });
    }

    settings[section] = { ...settings[section], ...data };
    await settings.save();

    res.json({ message: `${section} updated successfully`, settings });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error });
  }
};

// Generate new API key
const generateApiKey = async (req, res) => {
  try {
    const randomString = Math.random().toString(36).substring(2, 15);
    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = await AdminSettings.create({});
    }

    settings.integration.apiKeys.push({
      key: randomString,
      createdAt: new Date(),
      status: "active",
    });

    await settings.save();

    res.json({ message: "New API key generated", key: randomString });
  } catch (error) {
    res.status(500).json({ message: "Error generating API key", error });
  }
};

module.exports = {
  createSettings,
  updateSettings,
  generateApiKey,
};
