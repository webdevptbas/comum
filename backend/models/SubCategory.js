const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// prevent duplicate inside same category
subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

subCategorySchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name.toUpperCase();
  }
  next();
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
