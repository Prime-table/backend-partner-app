const AdminSettings = require("../models/adminSettingSchema");

// GET security settings
const getSecuritySettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }
    res.json(settings.security);
  } catch (error) {
    console.error("Error fetching security settings:", error);
    res.status(500).json({ message: "Error fetching security settings", error });
  }
};

// UPDATE security settings
const updateSecuritySettings = async (req, res) => {
  try {
    const { twoFactorAuthentication, requireStrongPassword, sessionTimeout, failedLoginLockout } = req.body;

    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }

    settings.security = {
      twoFactorAuthentication: twoFactorAuthentication ?? settings.security.twoFactorAuthentication,
      requireStrongPassword: requireStrongPassword ?? settings.security.requireStrongPassword,
      sessionTimeout: sessionTimeout ?? settings.security.sessionTimeout,
      failedLoginLockout: failedLoginLockout ?? settings.security.failedLoginLockout,
    };

    await settings.save();

    res.json({ message: "Security settings updated successfully", security: settings.security });
  } catch (error) {
    console.error("Error updating security settings:", error);
    res.status(500).json({ message: "Error updating security settings", error });
  }
};

module.exports = { getSecuritySettings, updateSecuritySettings };
