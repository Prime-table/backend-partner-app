const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/userAuthController");

// Update partner password
router.post("/register", userAuthController.registerUser);
router.get("/login", userAuthController.loginUser);

module.exports = router;
