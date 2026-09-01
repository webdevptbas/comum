const express = require("express");
const router = express.Router();
const {
  createPastEvent,
  getAllPastEvents,
  getPastEventById,
  updatePastEvent,
  deletePastEvent,
} = require("../controllers/pastEventController");
const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");
const { uploadThumbnail } = require("../middleware/uploadMiddleware");

//public routes
router.get("/", getAllPastEvents);
router.get("/:id", getPastEventById);

//protected routes
//create event
router.post(
  "/",
  uploadThumbnail,
  protectAdmin,
  roleCheck("AdminEvent"),
  createPastEvent,
);

//update an event
router.put(
  "/:id",
  uploadThumbnail,
  protectAdmin,
  roleCheck("AdminEvent"),
  updatePastEvent,
);

//delete an event
router.delete("/:id", protectAdmin, roleCheck("AdminEvent"), deletePastEvent);

module.exports = router;
