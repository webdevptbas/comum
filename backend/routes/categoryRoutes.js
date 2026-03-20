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

const { protect, roleCheck } = require("../middleware/authMiddleware");

// CATEGORY
router.get("/", getCategories);
router.post("/", protect, roleCheck("AdminProduct"), createCategory);
router.delete("/:id", protect, roleCheck("AdminProduct"), deleteCategory);

// SUBCATEGORY
router.get("/:categoryId/sub", getSubCategoriesByCategory);
router.post("/sub", protect, roleCheck("AdminProduct"), createSubCategory);
router.delete(
  "/sub/:id",
  protect,
  roleCheck("AdminProduct"),
  deleteSubCategory,
);

module.exports = router;
