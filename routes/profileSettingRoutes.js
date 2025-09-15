const express = require("express");
const router = express.Router();
const profileSettingControllers = require("../controllers/profileSettingControllers");

// Update or create profile setting
router.put("/update", profileSettingControllers.updateProfileSetting);

// Get profile setting
router.get("/", profileSettingControllers.getProfileSetting);

module.exports = router;
