const express = require("express");
const profileControllers = require("../controllers/profileControllers");

const router = express.Router();

router.post("/profile", profileControllers.createProfile);
router.get("/profile", profileControllers.getProfiles);
router.get("/profile/:id", profileControllers.getProfileById);
router.put("/profile/:id", profileControllers.updateProfile);
router.delete("/profile/:id", profileControllers.deleteProfile);

module.exports = router;
