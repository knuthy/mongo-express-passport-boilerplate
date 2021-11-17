// Modules
const express = require("express");
const router = express.Router();

// Components
const userController = require('../controllers/user');

// User data route
router.get("/", userController.data);

// Signup route
router.post("/signup", userController.signup);

// Login route
router.post('/login', userController.login);

// Logout route
router.get('/logout', userController.logout);

// Export router
module.exports = router;