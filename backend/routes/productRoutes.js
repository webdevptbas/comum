const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, roleCheck } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes for AdminEvent and AdminProduct
router.post("/", protect, roleCheck("AdminProduct"), upload, createProduct);
router.put("/:id", protect, roleCheck("AdminProduct"), upload, updateProduct);
router.delete("/:id", protect, roleCheck("AdminProduct"), deleteProduct);

module.exports = router;
