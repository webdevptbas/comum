const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, brand: 1 }, { unique: true }); // A category name must be unique per brand

module.exports = mongoose.model("Category", categorySchema);
