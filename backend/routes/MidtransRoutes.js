const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/MidtransController");

//PRIVATE USER ROUTE
router.post("/", createPayment);

module.exports = router;
