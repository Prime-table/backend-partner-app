const express = require("express");
const securityControllers = require("../controllers/adminSecurityControllers");

const router = express.Router();

// Get and update security settings
router.get("/", securityControllers.getSecuritySettings);
router.put("/", securityControllers.updateSecuritySettings);

module.exports = router;
