const Event = require("../models/Event");
const path = require("path");
const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Failed to delete file:", err);
  });
};

// CREATE a new event
exports.createEvent = async (req, res) => {
  try {
    const backendBaseUrl = `${req.protocol}://${req.get("host")}`; // e.g., http://localhost:5000
    const imagePath = req.files?.[0]?.path.replace(/\\/g, "/") || "";
    const imageUrl = `${backendBaseUrl}/${imagePath}`;

    const newEvent = new Event({
      ...req.body,
      imageUrl,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE an event with image replacement
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const backendBaseUrl = `${req.protocol}://${req.get("host")}`;
    let updatedData = { ...req.body };

    if (req.file) {
      // Delete the old image file
      if (event.imageUrl) {
        const oldRelativePath = event.imageUrl.replace(
          `${backendBaseUrl}/`,
          ""
        );
        const oldImagePath = path.join(__dirname, "..", oldRelativePath);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }

      const newImagePath = req.file.path.replace(/\\/g, "/");
      updatedData.imageUrl = `${backendBaseUrl}/${newImagePath}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE an event and its image
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.imageUrl) {
      const backendBaseUrl = `${req.protocol}://${req.get("host")}`;
      const relativePath = event.imageUrl.replace(`${backendBaseUrl}/`, "");
      const imagePath = path.join(__dirname, "..", relativePath);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event and image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
