// controllers/productController.js
const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const crypto = require("crypto");

// @desc    create products
exports.createProduct = async (req, res) => {
  try {
    const imageUrls = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    const {
      brand,
      category,
      subCategory,
      brandType,
      specification,
      color,
      gender,
      saleHighlight,
      details,
      variations,
    } = req.body;

    const parsedVariations = JSON.parse(variations || "[]").map((v) => ({
      itemCode: v.itemCode,
      size: v.size,
      productCode: v.productCode,
      price: parseFloat(v.price),
      isDiscount: v.isDiscount === "true" || v.isDiscount === true,
      discount: parseFloat(v.discount) || 0,
      stock: parseInt(v.stock) || 0,
    }));

    const product = await Product.create({
      imageUrl: imageUrls,
      brand,
      category,
      subCategory,
      brandType,
      specification,
      color,
      gender: Array.isArray(gender) ? gender : [gender],
      saleHighlight: saleHighlight === "true" || saleHighlight === true,
      details,
      variations: parsedVariations,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all product
exports.getAllProducts = async (req, res) => {
  try {
    const { brand, category, gender, keyword } = req.query;
    let filter = {};

    if (brand) {
      filter.brand = brand;
    }
    if (category) {
      filter.category = category;
    }
    if (gender) {
      const genderArray = gender.includes(",") ? gender.split(",") : [gender];

      filter.gender = { $in: genderArray }; // 🔥 Mongo magic
    }

    if (keyword) {
      const words = keyword.split(" ").filter(Boolean);

      filter.$and = words.map((word) => ({
        productName: {
          $regex: word,
          $options: "i",
        },
      }));
    }

    const products = await Product.find(filter)
      .populate("createdBy", "username role")
      .populate("brand", "name")
      .populate("brandType", "name");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand", "name")
      .populate("brandType", "name");
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedImages = [...(product.imageUrl || [])];

    // Handle deleted images
    if (req.body.deletedImages) {
      const toDelete = JSON.parse(req.body.deletedImages);

      updatedImages = updatedImages.filter((url) => !toDelete.includes(url));

      for (const url of toDelete) {
        const filename = decodeURIComponent(url.split("/").pop());
        const filePath = path.join(__dirname, "..", "uploads", filename);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    // Handle new uploads
    if (req.files && req.files.length > 0) {
      const newUrls = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      );

      updatedImages.push(...newUrls);
    }

    updateData.imageUrl = updatedImages;

    // Normalize and convert data types
    if (updateData.gender) {
      updateData.gender = Array.isArray(updateData.gender)
        ? updateData.gender
        : [updateData.gender];
    }
    updateData.saleHighlight =
      updateData.saleHighlight === "true" || updateData.saleHighlight === true;

    // Handle variations
    if (updateData.variations) {
      const parsedVariations = JSON.parse(updateData.variations);

      const normalizedVariations = parsedVariations.map((v) => {
        const price = parseFloat(v.price);
        const discount = parseFloat(v.discount || 0);
        const isDiscount = v.isDiscount === "true" || v.isDiscount === true;
        const discountPrice = isDiscount
          ? Math.round(price - (price * discount) / 100)
          : price;

        return {
          itemCode: v.itemCode,
          size: v.size,
          productCode: v.productCode,
          price,
          isDiscount,
          discount,
          discountPrice,
          stock: parseInt(v.stock || 0),
        };
      });

      updateData.variations = normalizedVariations;
    }

    // Auto-generate productName
    const parts = [
      updateData.brand || product.brand,
      updateData.category || product.category,
      updateData.brandType || product.brandType,
      updateData.color || product.color,
    ].filter(Boolean);

    updateData.productName = parts.join(" ").trim();

    // Final update
    Object.assign(product, updateData);

    // Save triggers pre("save") hook
    const updatedProduct = await product.save();

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

// const upload = multer({ dest: "uploads/csv/" });

exports.importCsv = async (req, res) => {
  const results = [];
  try {
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const importedProducts = [];

        for (const item of results) {
          try {
            const newProduct = new Product({
              brand: item.brand,
              category: item.category,
              subCategory: item.subCategory,
              brandType: item.brandType,
              specification: item.specification,
              color: item.color,

              gender: item.gender
                ? item.gender.split(",").map((g) => g.trim())
                : [],

              saleHighlight: false,
              details: item.details,

              variations: [
                {
                  itemCode: item.itemCode,
                  size: item.size,
                  price: parseFloat(item.price) || 0,
                  isDiscount: false,
                  discount: 0,
                  stock: parseInt(item.stock) || 0,
                },
              ],

              createdBy: req.user._id,
            });

            await newProduct.save(); // triggers pre-save hook
            importedProducts.push(newProduct);
          } catch (e) {
            console.warn("Skipping invalid row:", item, e.message);
          }
        }

        fs.unlinkSync(filePath);
        res.status(200).json({
          message: "CSV imported",
          importedCount: importedProducts.length,
        });
      });
  } catch (error) {
    console.error("Import error:", error);
    res.status(500).json({ message: "Failed to import CSV" });
  }
};
