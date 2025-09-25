const express = require("express");
const adminSettingsControllers = require("../controllers/adminSettingsControllers");

const router = express.Router();

// GET all settings
router.post("/general-settings", adminSettingsControllers.createSettings);

// UPDATE settings section
router.put("/", adminSettingsControllers.updateSettings);

// Generate API key
router.post("/generate-key", adminSettingsControllers.generateApiKey);

module.exports = router;
