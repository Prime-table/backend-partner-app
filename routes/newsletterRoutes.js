const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newletterController");

// Update partner password
router.post("/newsletter", newsletterController.signUpNewsletter);

// // Optional: get security info by partnerId
// router.get("/", securityControllers.getSecurity);

module.exports = router;
