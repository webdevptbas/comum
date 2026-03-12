const express = require("express");
const router = express.Router();
const {
  getBrands,
  addBrand,
  deleteBrand,
  updateBrandStatus,
} = require("../controllers/brandController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//Public routes
router.get("/", getBrands);

//Protected admin routes
router.post("/", protect, roleCheck("AdminProduct"), addBrand);
router.delete("/:id", protect, roleCheck("AdminProduct"), deleteBrand);
router.patch("/:id", protect, roleCheck("AdminProduct"), updateBrandStatus);

module.exports = router;
