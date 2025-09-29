const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

// GET all users
router.get("/", userControllers.getUsers);

// GET single user
router.get("/:id", userControllers.getUserById);

// CREATE user
router.post("/", userControllers.createUser);

// UPDATE user
router.put("/:id", userControllers.updateUser);

// DELETE user
router.delete("/:id", userControllers.deleteUser);

router.delete("/users/bulk-delete", userControllers.bulkDeleteUsers); 

module.exports = router;
