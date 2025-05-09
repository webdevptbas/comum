const express = require("express");
const router = express.Router();
const {
  createPastEvent,
  getAllPastEvents,
  getPastEventById,
  updatePastEvent,
  deletePastEvent,
} = require("../controllers/pastEventController");
const { protect, roleCheck } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

//public routes
router.get("/", getAllPastEvents);
router.get("/:id", getPastEventById);

//protected routes
//create event
router.post("/", protect, roleCheck("AdminEvent"), upload, createPastEvent);

//update an event
router.put("/:id", protect, roleCheck("AdminEvent"), upload, updatePastEvent);

//delete an event
router.delete("/:id", protect, roleCheck("AdminEvent"), deletePastEvent);

module.exports = router;
