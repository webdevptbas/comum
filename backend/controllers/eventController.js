const Event = require("../models/Event");
const path = require("path");
const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Failed to delete file:", err);
  });
};

const normalizeEventPayload = (body) => {
  const base = {
    type: body.type || "cycling",
    title: body.title,
    contactPerson: body.contactPerson,
    contactInfo: body.contactInfo,
    description: body.description,
    shortDesc: body.shortDesc,
    // location: body.location,
    // address: body.address,
    date: body.date,
    startTime: body.startTime,
    additionalDetail: body.additionalDetail,
  };

  if (base.type === "cycling") {
    base.cycling = {
      paceMin: body.cycling?.paceMin,
      paceMax: body.cycling?.paceMax,
      durationMinutes: body.cycling?.durationMinutes,
      start: body.cycling?.start,
      finish: body.cycling?.finish,
    };
    base.padel = undefined;
  }

  if (base.type === "padel") {
    base.padel = {
      location: body.padel?.location,
      court: body.padel?.court,
      level: body.padel?.level,
      maxPlayers: body.padel?.maxPlayers,
      matchFormat: body.padel?.matchFormat,
      partnerType: body.padel?.partnerType,
      durationMinutes: body.padel?.durationMinutes,
    };
    base.cycling = undefined;
  }

  return base;
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

    if (req.body.cycling) {
      req.body.cycling = JSON.parse(req.body.cycling);
    }

    if (req.body.padel) {
      req.body.padel = JSON.parse(req.body.padel);
    }

    const normalizedData = normalizeEventPayload({
      ...req.body,
      contactInfo: cleanContactInfo,
    });

    const newEvent = new Event({
      ...normalizedData,
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
    res.set("Cache-Control", "no-store");
    const { start, end, type } = req.query;

    const query = {};
    if (type) {
      query.type = type;
    }

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
    if (req.body.cycling) {
      req.body.cycling = JSON.parse(req.body.cycling);
    }

    if (req.body.padel) {
      req.body.padel = JSON.parse(req.body.padel);
    }
    const normalizedData = normalizeEventPayload({
      ...event.toObject(),
      ...req.body,
    });

    if (req.file) {
      if (event.imageUrl) {
        const oldRelativePath = event.imageUrl.replace(
          `${backendBaseUrl}/`,
          "",
        );
        const oldImagePath = path.join(__dirname, "..", oldRelativePath);
        deleteFile(oldImagePath);
      }

      const newImagePath = req.file.path.replace(/\\/g, "/");
      normalizedData.imageUrl = `${backendBaseUrl}/${newImagePath}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      normalizedData,
      { new: true, runValidators: true },
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
      deleteFile(imagePath);
    }

    await Event.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `Event "${event.title}" deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
