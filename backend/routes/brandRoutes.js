const express = require("express");
const router = express.Router();
const {
  getBrands,
  addBrand,
  deleteBrand,
} = require("../controllers/brandController");

//Public routes
router.get("/", getBrands);
router.post("/", addBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
