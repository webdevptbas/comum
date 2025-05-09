const mongoose = require("mongoose");

const pastEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoUrl: { type: String }, // Optional for now
    location: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    additionalDetail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PastEvent", pastEventSchema);
