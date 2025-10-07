const express = require("express");
const AuthControllers = require("../controllers/AuthControllers");
const { authMiddleware } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/register", AuthControllers.registerPartner);
router.post("/login", AuthControllers.loginPartner);
router.post("/logout", AuthControllers.logoutPartner);
router.get("/profile", authMiddleware, AuthControllers.getPartnerProfile);

module.exports = router;
