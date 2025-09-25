const express = require("express");
const adminNotificationsControllers = require("../controllers/adminNotificationsControllers");

const router = express.Router();

// GET /notifications
router.get("/", adminNotificationsControllers.getNotificationSettings);

// PUT /notifications
router.put("/", adminNotificationsControllers.updateNotificationSettings);

module.exports = router;
