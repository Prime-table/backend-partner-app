const express = require("express");
const AuthControllers = require("../controllers/partner/AuthControllers");

const router = express.Router();

router.post("/register", AuthControllers.registerPartner);
router.post("/login", AuthControllers.loginPartner);
router.post("/logout", AuthControllers.logoutPartner);
router.get("/profile", AuthControllers.getPartnerProfile);

module.exports = router;
