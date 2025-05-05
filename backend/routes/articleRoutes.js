const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

// router.get("/", protect, roleCheck("adminEvent"), getAllArticle);
// router.post("/", protect, roleCheck("adminEvent"), createArticle);

module.exports = router;
