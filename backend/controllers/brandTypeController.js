const BrandType = require("../models/BrandType");
const Brand = require("../models/Brand");

// @desc Add new Brand
exports.addBrandType = async (req, res) => {
  try {
    const { name, description, brand } = req.body;

    if (!name || !brand) {
      return res.status(400).json({ message: "Name and Brand are required" });
    }

    const brandExists = await Brand.findById(brand);

    if (!brandExists) {
      return res.status(404).json({ message: "Brand not found" });
    }

    const brandType = await BrandType.create({
      name,
      description,
      brand,
    });

    res
      .status(201)
      .json({ message: "Brand Type created successfully", brandType });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Brand Type already exists for this brand",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// @desc get brand list
exports.getBrandTypesByBrand = async (req, res) => {
  try {
    const brandTypes = await BrandType.find({
      brand: req.params.brandId,
    }).select("name");

    res.status(200).json(brandTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBrandType = async (req, res) => {
  try {
    const brandType = await BrandType.findById(req.params.id);

    if (!brandType) {
      return res.status(404).json({ message: "Brand Type not found" });
    }

    await brandType.deleteOne();

    res.json({ message: "Brand Type deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
