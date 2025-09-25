const AdminSettings = require("../models/adminSettingSchema");
const cloudinary = require("../config/cloudinary"); // your cloudinary.js util

// Create or update branding settings
const createOrUpdateBranding = async (req, res) => {
  try {
    const { primaryColor, secondaryColor } = req.body;
    let logoUrl = null;
    let faviconUrl = null;

    // Handle logo upload if provided
    if (req.files && req.files.logo) {
      const logoUpload = await cloudinary.uploader.upload(
        req.files.logo[0].path,
        { folder: "branding/logo" }
      );
      logoUrl = logoUpload.secure_url;
    }

    // Handle favicon upload if provided
    if (req.files && req.files.favicon) {
      const faviconUpload = await cloudinary.uploader.upload(
        req.files.favicon[0].path,
        { folder: "branding/favicon" }
      );
      faviconUrl = faviconUpload.secure_url;
    }

    let settings = await AdminSettings.findOne();

    if (!settings) {
      // Create new settings with branding
      settings = await AdminSettings.create({
        branding: {
          primaryColor,
          secondaryColor,
          logo: logoUrl || "/logo.png",
          favicon: faviconUrl || "/favicon.ico",
        },
      });
    } else {
      // Update existing settings
      if (primaryColor) settings.branding.primaryColor = primaryColor;
      if (secondaryColor) settings.branding.secondaryColor = secondaryColor;
      if (logoUrl) settings.branding.logo = logoUrl;
      if (faviconUrl) settings.branding.favicon = faviconUrl;

      await settings.save();
    }

    res.json({ message: "Branding updated successfully", branding: settings.branding });
  } catch (error) {
    console.error("Error updating branding:", error);
    res.status(500).json({ message: "Error updating branding", error });
  }
};

module.exports = { createOrUpdateBranding };
