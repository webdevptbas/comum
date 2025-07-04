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
    const backendBaseUrl = `${process.env.PROTOCOL}://${process.env.HOST}`;
    const imagePath = req.file?.path?.replace(/\\/g, "/");
    if (!imagePath) {
      return res.status(400).json({ error: "Image upload failed" });
    }
    const imageUrl = `${backendBaseUrl}/${imagePath}`;

    const cleanContactInfo = (req.body.contactInfo || "").replace(/\D/g, "");

    const newEvent = new Event({
      ...req.body,
      contactInfo: cleanContactInfo,
      imageUrl,
    });

    const savedEvent = await newEvent.save();
    res
      .status(201)
      .json({ savedEvent, message: "Event created successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all events with date filter
exports.getAllEvents = async (req, res) => {
  try {
    const { start, end } = req.query;

    const query = {};
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const events = await Event.find(query).sort({ date: 1 });
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

    const backendBaseUrl = `${process.env.PROTOCOL}://${process.env.HOST}`;
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

    res.status(200).json({
      updatedEvent,
      message: "Event updated successfully!",
    });
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
      const backendBaseUrl = `${process.env.PROTOCOL}://${process.env.HOST}`;
      const relativePath = event.imageUrl.replace(`${backendBaseUrl}/`, "");
      const imagePath = path.join(__dirname, "..", relativePath);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await Event.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `Event "${event.title}" deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
