const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

// Update partner password
router.get("/", userController.getUsers);

module.exports = router;
