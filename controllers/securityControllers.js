const Security = require("../models/securitySchema");
const bcrypt = require("bcryptjs");

// Update partner password (create if not exists)
const updateSecurity = async (req, res) => {
  try {
    const { partnerId, currentPassword, newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    let security = await Security.findOne({ partnerId });

    if (!security) {
      // No record exists yet → create new security record
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      security = await Security.create({ partnerId, password: hashedPassword });
      return res.status(201).json({ message: "Security record created successfully" });
    }

    // If record exists, require currentPassword to match
    if (!currentPassword) {
      return res.status(400).json({ message: "Current password is required to update password" });
    }

    const isMatch = await bcrypt.compare(currentPassword, security.password);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    security.password = hashedPassword;
    await security.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating security" });
  }
};

// Get partner security info (optional)
const getSecurity = async (req, res) => {
  try {
    const { partnerId } = req.query;
    if (!partnerId) return res.status(400).json({ message: "Partner ID is required" });

    const security = await Security.findOne({ partnerId });
    if (!security) return res.status(404).json({ message: "Partner security record not found" });

    res.status(200).json({ partnerId: security.partnerId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching security" });
  }
};

module.exports = {
  updateSecurity,
  getSecurity,
};
