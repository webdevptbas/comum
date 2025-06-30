const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: [String], // array of image URLs
      default: [],
      required: false,
    },
    itemCode: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: false,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      trim: true,
      required: false,
    },
    brandType: {
      type: String,
      required: false,
      trim: true,
    },
    specification: {
      type: String,
      required: false,
      trim: true,
    },
    color: {
      type: String,
      required: false,
      trim: true,
    },
    size: {
      type: String,
      required: false,
      trim: true,
    },
    productCode: {
      type: String,
      required: false,
      trim: true,
    },
    year: { type: String }, //arrivalYear but in Symbol
    arrivalYear: { type: Number },
    seasonYear: { type: String },
    gender: [{ type: String }],
    price: {
      type: Number,
      required: true,
    },
    isDiscount: {
      type: Boolean,
      required: true,
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
    stock: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate discountPrice
productSchema.pre("save", function (next) {
  // Auto-calculate discountPrice
  if (this.isDiscount && this.discount > 0) {
    const discountAmount = (this.discount / 100) * this.price;
    this.discountPrice = this.price - discountAmount;
  } else {
    this.discountPrice = this.price;
  }

  // Auto-generate year symbol from arrivalYear
  if (this.arrivalYear) {
    const lastDigit = this.arrivalYear % 10;
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
    this.year = symbolMap[lastDigit];
  }

  // Generate productName
  const parts = [
    this.brand,
    this.category,
    this.brandType,
    this.color,
    this.size,
    this.productCode,
    this.year,
  ].filter(Boolean); // remove falsy values

  this.productName = parts.join(" ").trim();

  next();
});

module.exports = mongoose.model("Product", productSchema);
