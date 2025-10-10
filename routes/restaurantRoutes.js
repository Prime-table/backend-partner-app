const express = require("express");
const profileControllers = require("../controllers/profileControllers");

const router = express.Router();

router.post("/create", profileControllers.createRestuarant);
router.get("/all-restaurants", profileControllers.getRestuarants);
// router.get("/profile/:id", profileControllers.getProfileById);
// router.put("/profile/:id", profileControllers.updateProfile);
// router.delete("/profile/:id", profileControllers.deleteProfile);

module.exports = router;
