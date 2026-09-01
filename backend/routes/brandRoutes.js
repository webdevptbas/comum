const express = require("express");
const router = express.Router();
const {
  getBrands,
  addBrand,
  deleteBrand,
  updateBrandStatus,
} = require("../controllers/brandController");
const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");

//Public routes
router.get("/", getBrands);

//Protected admin routes
router.post("/", protectAdmin, roleCheck("AdminProduct"), addBrand);
router.delete("/:id", protectAdmin, roleCheck("AdminProduct"), deleteBrand);
router.patch(
  "/:id",
  protectAdmin,
  roleCheck("AdminProduct"),
  updateBrandStatus,
);

module.exports = router;
