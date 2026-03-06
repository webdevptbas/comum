const express = require("express");
const router = express.Router();
const {
  getBrandTypesByBrand,
  addBrandType,
  deleteBrandType,
} = require("../controllers/brandTypeController");

//Public routes
router.get("/:brandId", getBrandTypesByBrand);
router.post("/", addBrandType);
router.delete("/:id", deleteBrandType);

module.exports = router;
