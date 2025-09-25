const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminBrandingControllers = require("../controllers/adminBrandingControllers");

const upload = multer({ dest: "uploads/" }); // temp storage before cloudinary

// Accept form-data: primaryColor, secondaryColor, logo, favicon
router.post(
  "/branding",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  adminBrandingControllers.createOrUpdateBranding
);

module.exports = router;
