const express = require("express");
const router = express.Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  getSubCategoriesByCategory,
  createSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");

// CATEGORY
router.get("/", getCategories);
router.post("/", protectAdmin, roleCheck("AdminProduct"), createCategory);
router.delete("/:id", protectAdmin, roleCheck("AdminProduct"), deleteCategory);

// SUBCATEGORY
router.get("/:categoryId/sub", getSubCategoriesByCategory);
router.post("/sub", protectAdmin, roleCheck("AdminProduct"), createSubCategory);
router.delete(
  "/sub/:id",
  protectAdmin,
  roleCheck("AdminProduct"),
  deleteSubCategory,
);

module.exports = router;
