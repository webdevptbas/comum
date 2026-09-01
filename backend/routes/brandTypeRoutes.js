const express = require("express");
const router = express.Router();
const {
  getBrandTypesByBrand,
  addBrandType,
  deleteBrandType,
} = require("../controllers/brandTypeController");
const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");

//Public routes
router.get("/:brandId", getBrandTypesByBrand);

//Protected routes
router.post("/", protectAdmin, roleCheck("AdminProduct"), addBrandType);
router.delete("/:id", protectAdmin, roleCheck("AdminProduct"), deleteBrandType);

module.exports = router;
