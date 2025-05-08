const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
