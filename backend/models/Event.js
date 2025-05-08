const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: false },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g., "07:00 AM"
    durationMinutes: { type: Number, required: true },
    additionalDetail: { type: String, required: false }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
