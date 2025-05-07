// controllers/productController.js
const Product = require("../models/Product");
const {
  uploadFilesToSynology,
  getPublicImageUrl,
} = require("../services/sftpService");
const sftpClient = require("ssh2-sftp-client");

exports.createProduct = async (req, res) => {
  try {
    const imageUrls = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    const {
      productName,
      brand,
      category,
      sportCategory,
      price,
      variants,
      gender,
      isDiscount,
      discount,
      discountPrice,
      details,
    } = req.body;

    const product = await Product.create({
      imageUrl: imageUrls,
      productName,
      brand,
      category,
      sportCategory: Array.isArray(sportCategory)
        ? sportCategory
        : [sportCategory],
      price,
      variants: JSON.parse(variants),
      gender: Array.isArray(gender) ? gender : [gender],
      isDiscount,
      discount,
      discountPrice,
      details,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "createdBy",
      "username role"
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // 1. Delete removed images from local storage
    if (req.body.deletedImages && Array.isArray(req.body.deletedImages)) {
      for (const url of req.body.deletedImages) {
        const filename = decodeURIComponent(url.split("/").pop());
        const filePath = path.join(__dirname, "..", "uploads", filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    // 2. Upload new images (already stored by multer)
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => {
        return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
      });
      updateData.imageUrl = imageUrls;
    }

    // 3. Normalize form data
    if (req.body.sportCategory) {
      updateData.sportCategory = Array.isArray(req.body.sportCategory)
        ? req.body.sportCategory
        : [req.body.sportCategory];
    }

    if (req.body.gender) {
      updateData.gender = Array.isArray(req.body.gender)
        ? req.body.gender
        : [req.body.gender];
    }

    if (req.body.variants) {
      updateData.variants = JSON.parse(req.body.variants);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete all local image files
    if (product.imageUrl && Array.isArray(product.imageUrl)) {
      for (const url of product.imageUrl) {
        const filename = decodeURIComponent(url.split("/").pop());
        const filePath = path.join(__dirname, "..", "uploads", filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product and images deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
