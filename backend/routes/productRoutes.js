const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  importCsv,
  getProductByBrand,
} = require("../controllers/productController");
const multer = require("multer");
const csvUpload = multer({ dest: "uploads/csv/" });

const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/brand/:brand", getProductByBrand);

// Protected routes for AdminEvent and AdminProduct
router.post(
  "/",
  protectAdmin,
  roleCheck("AdminProduct"),
  upload,
  createProduct,
);
router.put(
  "/:id",
  protectAdmin,
  roleCheck("AdminProduct"),
  upload,
  updateProduct,
);
router.delete("/:id", protectAdmin, roleCheck("AdminProduct"), deleteProduct);
router.post(
  "/import-csv",
  protectAdmin,
  roleCheck("AdminProduct"),
  csvUpload.single("csv"),
  importCsv,
);

module.exports = router;
