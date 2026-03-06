const express = require("express");
const router = express.Router();
const {
  registerBuyer,
  loginUser,
  getCurrentUser,
  logout,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Register - Buyers only
router.post("/register", registerBuyer);

// Login - Buyers and Admins
router.post("/login", loginUser);

// Get current user info using token
router.get("/me", protect, getCurrentUser);

//Logout
router.post("/logout", logout);

module.exports = router;
