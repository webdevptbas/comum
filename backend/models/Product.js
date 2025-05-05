const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: [String], // array of image URLs
      default: [],
      required: true,
    },
    productName: {
      type: String,
      required: true,
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
    sportCategory: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    variants: [
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String, required: true },
      },
    ],
    gender: [{ type: String }],
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
    details: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate discountPrice
productSchema.pre("save", function (next) {
  if (this.isDiscount && this.discount > 0) {
    const discountAmount = (this.discount / 100) * this.price;
    this.discountPrice = this.price - discountAmount;
  } else {
    this.discountPrice = this.price;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
