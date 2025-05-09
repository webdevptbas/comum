const mongoose = require("mongoose");

const pastEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String }, // One-liner for list views
    thumbnail: { type: String, required: true },
    videoUrl: { type: String }, // Optional video
    location: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    additionalDetail: { type: String },

    // ✍️ Article-specific fields
    author: { type: String }, // Optional: name of writer/social media team
    articleSections: [
      {
        heading: { type: String },
        body: { type: String },
      },
    ],

    // Optional tags/categories for search/filters
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PastEvent", pastEventSchema);
