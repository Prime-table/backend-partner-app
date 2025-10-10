const express = require("express");
const router = express.Router();
const customerAuthController = require("../controllers/customerController");

// Update partner password
router.post("/register", customerAuthController.registerCustomer);
router.post("/login", customerAuthController.loginCustomer);
router.get("/all-customers", customerAuthController.getAllCustomers);

module.exports = router;
