const express = require("express");
const router = express.Router();
const {
  loginUser,
  logoutUser,
  getUserProfile,
  registerUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserProfile,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/authController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//PUBLIC ROUTE
router.post("/register", registerUser); // Register - Buyers only
router.post("/login", loginUser); // Login for Buyers only
router.post("/admin-login", loginAdmin); // Login for Admins only

//PRIVATE ROUTE
router.post("/logout", protect, logoutUser); //Logout
router.post("/admin-logout", protect, logoutAdmin); //Logout
router.get("/profile", protect, getUserProfile); // Get current user info using token (for user/buyer)
router.put("/profile", protect, updateUserProfile); // update user profile by user themselves, no need any :id

//PRIVATE ADMIN ROUTE
router.get("/admin-profile", protect, getUserProfile); // Get current user info using token (for user/buyer)
router.get("/users", protect, roleCheck("AdminProduct"), getUsers); // Get all users (for admin)
router.get("/:id", protect, roleCheck("AdminProduct"), getUserById); // Get user by id (for admin)
router.delete("/:id", protect, roleCheck("AdminProduct"), deleteUser); // delete user by id (for admin)
router.put("/:id", protect, roleCheck("AdminProduct"), updateUser); // update user by id (for admin)

module.exports = router;
