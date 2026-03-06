const Brand = require("../models/Brand");

// @desc Add new Brand
exports.addBrand = async (req, res) => {
  try {
    const { name, logoUrl, description, isActive, sortOrder } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Brand name is required" });
    }

    const slug = name.toLowerCase();

    const existing = await Brand.findOne({
      $or: [{ name: name.toUpperCase() }, { slug }],
    });

    if (existing) {
      return res.status(400).json({ message: "Brand already exist" });
    }

    const brand = await Brand.create({
      name,
      slug,
      logoUrl,
      description,
      isActive,
      sortOrder,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc get brand list
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).select(
      "name slug isActive",
    );

    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc delete brand
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await brand.deleteOne();

    res.json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
