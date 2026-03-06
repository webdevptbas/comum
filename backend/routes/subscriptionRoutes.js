const express = require("express");
const router = express.Router();
const { subscribeEmail } = require("../controllers/subscriptionController.js");

router.post("/", subscribeEmail);

module.exports = router;
