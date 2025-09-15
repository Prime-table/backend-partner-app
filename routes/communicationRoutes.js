const express = require("express");
const router = express.Router();
const communicationControllers = require("../controllers/communicationControllers");

// Save or update communication preferences
router.post("/communication", communicationControllers.updateCommunication);

// Get communication preferences
router.get("/communication", communicationControllers.getCommunication);

module.exports = router;
