const mongoose = require("mongoose");
const Brand = require("./Brand");
const BrandType = require("./BrandType");
const Category = require("./Category");
const SubCategory = require("./SubCategory");

const productSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: [String], //array of image URLs
      default: [],
    },

    productName: {
      type: String,
      trim: true,
    },

    displayPrice: {
      type: Number,
    },

    displayDiscountPrice: {
      type: Number,
    },

    displayIsDiscount: {
      type: Boolean,
    },

    displayDiscount: {
      type: Number,
    },

    displayStock: {
      type: Number,
      default: 0,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    brandType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BrandType",
    },

    specification: {
      type: String,
      trim: true,
    },

    color: {
      type: String,
      trim: true,
    },

    gender: [{ type: String }],

    saleHighlight: {
      type: Boolean,
      default: false,
    },

    details: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    variations: {
      type: [
        {
          itemCode: {
            //SKU
            type: String,
            required: true,
            trim: true,
          },

          size: {
            type: String,
            required: true,
            trim: true,
          },

          price: {
            type: Number,
            required: true,
          },

          isDiscount: {
            type: Boolean,
            default: false,
          },

          discount: {
            type: Number,
            default: 0,
            validate: {
              validator: function (val) {
                return val >= 0 && val <= 100;
              },
              message: "Discount must be between 0 and 100",
            },
          },

          discountPrice: Number,

          stock: {
            type: Number,
            default: 0,
          },
        },
      ],
      default: [],
      required: true,
    },
  },
  { timestamps: true },
);

// Pre-save hook to calculate pricing & display logic
productSchema.pre("save", async function (next) {
  try {
    // Safety: no variations
    if (!this.variations || this.variations.length === 0) {
      this.displayPrice = 0;
      this.displayDiscountPrice = 0;
      this.displayIsDiscount = false;
      this.displayDiscount = 0;
      this.displayStock = 0;
    } else {
      let lowestEffectivePrice = Infinity;
      let lowestVariation = null;
      let totalStock = 0;

      this.variations.forEach((variation) => {
        totalStock += variation.stock || 0;

        // Calculate discountPrice per variation
        if (variation.isDiscount && variation.discount > 0) {
          const discountAmount = (variation.discount / 100) * variation.price;

          variation.discountPrice = variation.price - discountAmount;
        } else {
          variation.discountPrice = variation.price;
        }

        const effectivePrice = variation.discountPrice;

        if (effectivePrice < lowestEffectivePrice) {
          lowestEffectivePrice = effectivePrice;
          lowestVariation = variation;
        }
      });

      this.displayStock = totalStock;

      if (lowestVariation) {
        // BEFORE discount
        this.displayPrice = lowestVariation.price;

        // AFTER discount
        this.displayDiscountPrice = lowestVariation.discountPrice;

        this.displayIsDiscount = lowestVariation.isDiscount || false;
        this.displayDiscount = lowestVariation.isDiscount
          ? lowestVariation.discount
          : 0;
      }
    }

    let brandName = "";
    let brandTypeName = "";
    let category = "";
    let subCategory = "";

    if (this.brand) {
      const brandDoc = await Brand.findById(this.brand).select("name");
      brandName = brandDoc?.name || "";
    }

    if (this.brandType) {
      const brandTypeDoc = await BrandType.findById(this.brandType).select(
        "name",
      );
      brandTypeName = brandTypeDoc?.name || "";
    }

    if (this.category) {
      const categoryDoc = await Category.findById(this.category).select("name");
      category = categoryDoc?.name || "";
    }

    if (this.subCategory) {
      const subCategoryDoc = await SubCategory.findById(this.category).select(
        "name",
      );
      subCategory = subCategoryDoc?.name || "";
    }

    // Generate productName using REAL brand name
    const parts = [brandName, category, brandTypeName, this.color].filter(
      Boolean,
    );

    this.productName = parts.join(" ").trim();

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Product", productSchema);
