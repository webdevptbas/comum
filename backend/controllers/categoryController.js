const Category = require("../models/Category");

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  const exist = await Category.findOne({
    name: name.toUpperCase(),
  });

  if (exist) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category removed" });
};
