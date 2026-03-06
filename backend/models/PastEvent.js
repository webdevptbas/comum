const mongoose = require("mongoose");

const pastEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true }, // One-liner for list views
    thumbnail: { type: String },
    videoUrl: { type: String }, // Optional video
    location: { type: String },
    address: { type: String },
    date: { type: Date },
    startTime: { type: String },
    durationMinutes: { type: Number },
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
