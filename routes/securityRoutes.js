const express = require("express");
const router = express.Router();
const securityControllers = require("../controllers/securityControllers");

// Update partner password
router.put("/update", securityControllers.updateSecurity);

// Optional: get security info by partnerId
router.get("/", securityControllers.getSecurity);

module.exports = router;
