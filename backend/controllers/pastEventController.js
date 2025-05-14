const PastEvent = require("../models/PastEvent");
const fs = require("fs");
const path = require("path");

// ✅ CREATE PastEvent
exports.createPastEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    let event = null;

    // If eventId is provided, fetch the Event
    if (eventId) {
      event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found." });
      }
    }

    const backendBaseUrl = `${process.env.PROTOCOL}://${process.env.HOST}`;
    const thumbnailPath = req.file?.path.replace(/\\/g, "/") || "";

    const thumbnailUrl = thumbnailPath
      ? `${backendBaseUrl}/${thumbnailPath}`
      : event?.imageUrl || ""; // fallback to event.imageUrl if exists

    // If articleSections is a string, parse it
    if (typeof req.body.articleSections === "string") {
      req.body.articleSections = JSON.parse(req.body.articleSections);
    }

    const pastEvent = new PastEvent({
      ...(event
        ? {
            // Copy fields from event
            title: event.title,
            description: event.description,
            location: event.location,
            address: event.address,
            date: event.date,
            startTime: event.startTime,
            durationMinutes: event.durationMinutes,
            contactPerson: event.contactPerson,
            contactInfo: event.contactInfo,
            additionalDetail: event.additionalDetail,
          }
        : req.body), // Otherwise use body
      thumbnail: thumbnailUrl,
      author: req.user.name,
      articleSections: req.body.articleSections,
    });

    const saved = await pastEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ GET all PastEvents
exports.getAllPastEvents = async (req, res) => {
  try {
    const events = await PastEvent.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET PastEvent by ID
exports.getPastEventById = async (req, res) => {
  try {
    const event = await PastEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "PastEvent not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE PastEvent
exports.updatePastEvent = async (req, res) => {
  try {
    const existing = await PastEvent.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ error: "PastEvent not found" });

    const backendBaseUrl = `${process.env.PROTOCOL}://${process.env.HOST}`;
    let newThumbnail = existing.thumbnail;

    if (req.file) {
      // Delete old thumbnail if exists
      if (existing.thumbnail) {
        const oldPath = path.join(
          __dirname,
          "..",
          existing.thumbnail.replace(`${backendBaseUrl}/`, "")
        );
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Failed to delete old thumbnail:", err);
        });
      }

      const thumbnailPath = req.file.path.replace(/\\/g, "/");
      newThumbnail = `${backendBaseUrl}/${thumbnailPath}`;
    }

    const updated = await PastEvent.findByIdAndUpdate(
      req.params.id,
      { ...req.body, thumbnail: newThumbnail },
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ DELETE PastEvent (already created earlier)
exports.deletePastEvent = async (req, res) => {
  try {
    const pastEvent = await PastEvent.findById(req.params.id);
    if (!pastEvent)
      return res.status(404).json({ error: "PastEvent not found" });

    if (pastEvent.thumbnail) {
      const backendBaseUrl = `${process.env.PROTOCOL}://${process.env.HOST}`;
      const relativePath = pastEvent.thumbnail.replace(
        `${backendBaseUrl}/`,
        ""
      );
      const imagePath = path.join(__dirname, "..", relativePath);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete thumbnail:", err);
      });
    }

    await PastEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "PastEvent deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
