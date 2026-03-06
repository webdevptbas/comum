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
const { uploadThumbnail } = require("../middleware/uploadMiddleware");

//public routes
router.get("/", getAllPastEvents);
router.get("/:id", getPastEventById);

//protected routes
//create event
router.post(
  "/",
  uploadThumbnail,
  protect,
  roleCheck("AdminEvent"),
  createPastEvent
);

//update an event
router.put(
  "/:id",
  uploadThumbnail,
  protect,
  roleCheck("AdminEvent"),
  updatePastEvent
);

//delete an event
router.delete("/:id", protect, roleCheck("AdminEvent"), deletePastEvent);

module.exports = router;
