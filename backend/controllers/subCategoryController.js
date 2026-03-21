const SubCategory = require("../models/SubCategory");

// GET BY CATEGORY
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const subs = await SubCategory.find({
      category: req.params.categoryId,
    }).select("name");

    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE SUBCATEGORY
exports.createSubCategory = async (req, res) => {
  const { name, category } = req.body;

  const exist = await SubCategory.findOne({
    name: name.toUpperCase(),
    category,
  });

  if (exist) {
    return res.status(400).json({ message: "Subcategory already exists" });
  }

  const sub = await SubCategory.create({ name, category });

  res.status(201).json(sub);
};

// DELETE SUBCATEGORY
exports.deleteSubCategory = async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Subcategory removed" });
};
