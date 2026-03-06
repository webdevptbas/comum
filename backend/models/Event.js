const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["cycling", "padel"],
      required: true,
      default: "cycling",
    },
    title: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactInfo: { type: String, required: true },
    description: { type: String, required: false },
    shortDesc: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, required: true }, // base date (yyyy-mm-dd)
    startTime: { type: String, required: true }, // e.g., "05:30"
    additionalDetail: { type: String },
    cycling: {
      paceMin: { type: Number },
      paceMax: { type: Number },
      durationMinutes: { type: Number },
      start: { type: String }, //start
      finish: { type: String }, //finish place
    },
    padel: {
      location: { type: String },
      court: { type: Number },
      level: { type: String },
      maxPlayers: { type: Number },
      matchFormat: {
        type: String,
        enum: [
          "Mexicano",
          "Americano",
          "Mixicano",
          "Team Americano",
          "Team Mexicano",
        ],
      },
      partnerType: { type: String, enum: ["Fixed Partner", "Mixed Partner"] },
      durationMinutes: { type: Number },
    },

    // 🆕 Add computed fields
    startDateTime: { type: Date },
    endDateTime: { type: Date },
  },
  { timestamps: true },
);

function getDurationMinutes(doc) {
  if (doc.type === "cycling") {
    return doc.cycling?.durationMinutes;
  }

  if (doc.type === "padel") {
    return doc.padel?.durationMinutes;
  }

  return null;
}

function computeStartAndEnd(doc) {
  if (!doc.date || !doc.startTime) return;

  const durationMinutes = getDurationMinutes(doc);
  if (!durationMinutes) return;

  const [hour, minute] = doc.startTime.split(":").map(Number);

  const baseDate = new Date(doc.date);
  baseDate.setUTCHours(hour, minute, 0, 0);

  doc.startDateTime = new Date(baseDate);
  doc.endDateTime = new Date(baseDate.getTime() + durationMinutes * 60000);
}

eventSchema.pre("save", function (next) {
  computeStartAndEnd(this);
  next();
});

eventSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  const docToUpdate = await this.model.findOne(this.getQuery());
  if (!docToUpdate) return next();

  // Apply incoming updates to a temp object
  const tempDoc = {
    ...docToUpdate.toObject(),
    ...update,
    cycling: {
      ...docToUpdate.cycling,
      ...update.cycling,
    },
    padel: {
      ...docToUpdate.padel,
      ...update.padel,
    },
  };

  computeStartAndEnd(tempDoc);

  this.setUpdate({
    ...update,
    startDateTime: tempDoc.startDateTime,
    endDateTime: tempDoc.endDateTime,
  });

  next();
});

module.exports = mongoose.model("Event", eventSchema);
