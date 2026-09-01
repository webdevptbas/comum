const express = require("express");
const router = express.Router();
const {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} = require("../controllers/eventController");
const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");
const { uploadThumbnail } = require("../middleware/uploadMiddleware");

//public routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

//protected routes
//create event
router.post(
  "/",
  uploadThumbnail,
  protectAdmin,
  roleCheck("AdminEvent"),
  createEvent,
);

//update an event
router.put(
  "/:id",
  uploadThumbnail,
  protectAdmin,
  roleCheck("AdminEvent"),
  updateEvent,
);

//delete an event
router.delete("/:id", protectAdmin, roleCheck("AdminEvent"), deleteEvent);

module.exports = router;
