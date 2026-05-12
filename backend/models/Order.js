const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        itemCode: { type: String, required: true }, //SKU product
        productName: { type: String, required: true },
        imageUrl: { type: String, required: true },
        size: { type: String, required: true },
        weight: { type: Number, required: true, min: 10 },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, //finalPrice per item
        originalPrice: { type: Number, required: true },
        discount: { type: Number },
        discountPrice: { type: Number },
        isDiscount: { type: Boolean },
      },
    ],
    shippingAddress: {
      province: {
        value: { type: Number, required: true },
        label: { type: String, required: true },
      },
      city: {
        value: { type: Number, required: true },
        label: { type: String, required: true },
      },
      district: {
        value: { type: Number, required: true },
        label: { type: String, required: true },
      },
      subdistrict: {
        value: { type: Number },
        label: { type: String },
      },
      address: { type: String, required: true },
    },
    shippingMethod: {
      name: { type: String, required: true },
      code: { type: String, required: true },
      service: { type: String, required: true },
      description: { type: String, required: true },
      cost: { type: Number, required: true },
      etd: { type: String, required: true },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      fraudStatus: { type: String },
      grossAmount: { type: String },
      currency: { type: String },
      updateTime: { type: String },
      emailAddress: { type: String },
    },
    totalWeight: { type: Number, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: Date,

    snapToken: { type: String },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: Date,
  },
  { timestamps: true },
);

orderSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }

  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  this.orderId = `${formattedDate}-${this._id}`;

  next();
});

module.exports = mongoose.model("Order", orderSchema);
