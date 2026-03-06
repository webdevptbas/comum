const mongoose = require("mongoose");

const brandTypeSchema = new mongoose.Schema(
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
  { timestamps: true },
);

brandTypeSchema.index({ name: 1, brand: 1 }, { unique: true });

brandTypeSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name.toUpperCase();
  }
  next();
});

module.exports = mongoose.model("BrandType", brandTypeSchema);
