// controllers/productController.js
const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const imageUrls = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    const {
      itemCode,
      brand,
      category,
      subCategory,
      brandType,
      specification,
      color,
      size,
      productCode,
      arrivalYear,
      seasonYear,
      gender,
      price,
      isDiscount,
      discount,
      discountPrice,
      saleHighlight,
      details,
      stock,
    } = req.body;

    const product = await Product.create({
      imageUrl: imageUrls,
      itemCode,
      brand,
      category,
      subCategory,
      brandType,
      specification,
      color,
      size,
      productCode,
      arrivalYear: parseInt(arrivalYear),
      seasonYear,
      gender: Array.isArray(gender) ? gender : [gender],
      price: parseFloat(price),
      isDiscount: isDiscount === "true" || isDiscount === true,
      discount: parseFloat(discount),
      discountPrice,
      saleHighlight: saleHighlight === "true" || saleHighlight === true,
      details,
      stock,
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

    // 3. Normalize and convert data types
    if (updateData.arrivalYear)
      updateData.arrivalYear = parseInt(updateData.arrivalYear);
    if (updateData.seasonYear)
      updateData.seasonYear = updateData.seasonYear.toString();
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.discount)
      updateData.discount = parseFloat(updateData.discount);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    if (updateData.gender) {
      updateData.gender = Array.isArray(updateData.gender)
        ? updateData.gender
        : [updateData.gender];
    }
    updateData.isDiscount =
      updateData.isDiscount === "true" || updateData.isDiscount === true;
    updateData.saleHighlight =
      updateData.saleHighlight === "true" || updateData.saleHighlight === true;

    // 4. Generate year from arrivalYear
    if (updateData.arrivalYear) {
      const lastDigit = updateData.arrivalYear % 10;
      const symbolMap = [
        "#J",
        "#A",
        "#B",
        "#C",
        "#D",
        "#E",
        "#F",
        "#G",
        "#H",
        "#I",
      ];
      updateData.year = symbolMap[lastDigit];
    }

    // 5. Auto-generate productName
    const parts = [
      updateData.brand,
      updateData.category,
      updateData.brandType,
      updateData.color,
      updateData.size,
      updateData.productCode,
      updateData.year,
    ].filter(Boolean); // remove undefined/null/empty
    updateData.productName = parts.join(" ").trim();

    // 6. Recalculate discountPrice
    if (updateData.isDiscount && updateData.discount > 0 && updateData.price) {
      const discountAmount = (updateData.discount / 100) * updateData.price;
      updateData.discountPrice = updateData.price - discountAmount;
    } else if (updateData.price) {
      updateData.discountPrice = updateData.price;
    }

    // 7. Final update
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

const upload = multer({ dest: "uploads/csv/" });

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
              itemCode: item.itemCode,
              brand: item.brand,
              category: item.category,
              subCategory: item.subCategory,
              brandType: item.brandType,
              specification: item.specification,
              productCode: item.productCode,
              arrivalYear: parseInt(item.arrivalYear),
              seasonYear: item.seasonYear,
              gender: item.gender?.split(",").map((g) => g.trim()),
              price: parseFloat(item.price),
              details: item.details,
              color: item.color,
              size: item.size,
              isDiscount: false,
              stock: parseInt(item.stock),
              createdBy: req.user._id,
            });

            await newProduct.save();
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
