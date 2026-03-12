const express = require("express");
const router = express.Router();
const {
  getBrandTypesByBrand,
  addBrandType,
  deleteBrandType,
} = require("../controllers/brandTypeController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//Public routes
router.get("/:brandId", getBrandTypesByBrand);

//Protected routes
router.post("/", protect, roleCheck("AdminProduct"), addBrandType);
router.delete("/:id", protect, roleCheck("AdminProduct"), deleteBrandType);

module.exports = router;
