const express = require("express");
const adminControllers = require("../controllers/adminControllers");

const router = express.Router();

router.post("/register", adminControllers.registerAdmin);
router.post("/login", adminControllers.loginAdmin);
router.post("/forgot-password", adminControllers.forgotPassword);

module.exports = router;
