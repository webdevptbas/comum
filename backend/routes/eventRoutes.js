const express = require("express");
const router = express.Router();
const {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} = require("../controllers/eventController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//public routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

//protected routes
//create event
router.post("/", protect, roleCheck("AdminEvent"), createEvent);

//update an event
router.put("/:id", protect, roleCheck("AdminEvent"), updateEvent);

//delete an event
router.delete("/:id", protect, roleCheck("AdminEvent"), deleteEvent);

module.exports = router;
