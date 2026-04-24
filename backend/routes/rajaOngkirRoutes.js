const express = require("express");
const router = express.Router();
const {
  getProvinces,
  getCitiesByProvinceId,
  getDistrictsByCityId,
  getSubDistrictsByDistrictId,
  districtCalculateCost,
} = require("../controllers/RajaOngkirController");

//Public routes
router.get("/province", getProvinces);
router.get("/city/:id", getCitiesByProvinceId);
router.get("/district/:id", getDistrictsByCityId);
router.get("/sub-district/:id", getSubDistrictsByDistrictId);
router.post("/cost", districtCalculateCost);

module.exports = router;
