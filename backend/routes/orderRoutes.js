const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrderById,
  getMyOrders,
  updateMyOrderToPaid,
  updateMyOrderToDelivered,
  getAllOrders,
} = require("../controllers/orderController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//Private routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/my-orders/:id", protect, getMyOrderById);
router.get("/my-orders/:id/pay", protect, updateMyOrderToPaid);
router.get("/my-orders/:id/deliver", protect, updateMyOrderToDelivered);

//admin routes
router.get("/", protect, roleCheck("AdminProduct"), getAllOrders);

module.exports = router;
