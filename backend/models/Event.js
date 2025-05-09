const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactInfo: { type: String, required: true },
    description: { type: String, required: false },
    shortDesc: { type: String, required: true },
    imageUrl: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true }, // base date (yyyy-mm-dd)
    startTime: { type: String, required: true }, // e.g., "05:30"
    durationMinutes: { type: Number, required: true },
    additionalDetail: { type: String },

    // 🆕 Add computed fields
    startDateTime: { type: Date },
    endDateTime: { type: Date },
  },
  { timestamps: true }
);

function computeStartAndEnd(doc) {
  if (doc.date && doc.startTime) {
    const [hour, minute] = doc.startTime.split(":").map(Number);

    // Create a Date from the date and apply time
    const baseDate = new Date(doc.date);
    baseDate.setUTCHours(hour, minute, 0, 0);

    doc.startDateTime = new Date(baseDate);
    doc.endDateTime = new Date(
      baseDate.getTime() + doc.durationMinutes * 60000
    );
  }
}

eventSchema.pre("save", function (next) {
  computeStartAndEnd(this);
  next();
});

eventSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.date || update.startTime || update.durationMinutes) {
    const temp = {
      date: update.date ?? this._conditions.date,
      startTime: update.startTime ?? this._conditions.startTime,
      durationMinutes:
        update.durationMinutes ?? this._conditions.durationMinutes,
    };
    computeStartAndEnd(temp);
    this.setUpdate({ ...update, ...temp });
  }
  next();
});

module.exports = mongoose.model("Event", eventSchema);
