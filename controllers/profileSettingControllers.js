const ProfileSetting = require("../models/profileSettingSchema");

// Update or create profile setting
const updateProfileSetting = async (req, res) => {
  try {
    const { restaurantName, email, phone, contactPerson, password } = req.body;

    if (!restaurantName || !email || !phone || !password) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    let profile = await ProfileSetting.findOne({ email });

    if (profile) {
      profile.restaurantName = restaurantName;
      profile.phone = phone;
      profile.contactPerson = contactPerson;
      profile.password = password; // hash in production
      await profile.save();
      return res.status(200).json({ message: "Profile updated", profile });
    }

    profile = new ProfileSetting({ restaurantName, email, phone, contactPerson, password });
    await profile.save();
    res.status(201).json({ message: "Profile created", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating profile" });
  }
};

// Get profile setting by email
const getProfileSetting = async (req, res) => {
  try {
    const { email } = req.query; // /api/profile-setting?email=example@domain.com
    if (!email) return res.status(400).json({ message: "Email is required" });

    const profile = await ProfileSetting.findOne({ email });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

module.exports = {
  updateProfileSetting,
  getProfileSetting,
};
