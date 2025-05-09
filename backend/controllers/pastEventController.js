const PastEvent = require("../models/PastEvent");
const fs = require("fs");
const path = require("path");

// ✅ CREATE PastEvent
exports.createPastEvent = async (req, res) => {
  try {
    let thumbnailPath = "";
    if (req.files && req.files.length > 0) {
      thumbnailPath = req.files[0].path.replace(/\\/g, "/"); // Normalize Windows slashes
    }

    const pastEvent = new PastEvent({
      ...req.body,
      thumbnail: thumbnailPath,
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
    if (!existing) return res.status(404).json({ error: "PastEvent not found" });

    // If a new thumbnail is uploaded, delete old file
    let newThumbnail = existing.thumbnail;
    if (req.files && req.files.length > 0) {
      // Remove the old image if exists
      if (existing.thumbnail) {
        const oldPath = path.join(__dirname, "..", existing.thumbnail);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Failed to delete old thumbnail:", err);
        });
      }

      newThumbnail = req.files[0].path.replace(/\\/g, "/");
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
    if (!pastEvent) {
      return res.status(404).json({ error: "PastEvent not found" });
    }

    if (pastEvent.thumbnail) {
      const imagePath = path.join(__dirname, "..", pastEvent.thumbnail);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete thumbnail:", err);
        }
      });
    }

    await PastEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "PastEvent and thumbnail deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
