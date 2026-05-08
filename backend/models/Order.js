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
        price: { type: Number, required: true }, //finalPrice
        stock: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        price: { type: Number, required: true },
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
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      transactionId: { type: String, required: true },
      orderId: { type: String, required: true },
      transactionStatus: { type: String, required: true },
      fraudStatus: { type: String, required: true },
      grossAmount: { type: String, required: true },
      currency: { type: String, required: true },
      update_time: { type: String },
      email_address: { type: String, required: true },
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

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
