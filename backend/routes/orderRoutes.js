const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrderById,
  getMyOrders,
  updateMyOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
  getOrderById,
  getPaymentStatus,
  syncPaymentStatus,
  paymentNotification,
} = require("../controllers/orderController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//Public routes
router.post("/my-orders/payment-notification", paymentNotification);

//Private routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/my-orders/:id", protect, getMyOrderById);
router.get("/my-orders/:orderId/payment-status", protect, getPaymentStatus);
router.put("/my-orders/:orderId/sync-payment", protect, syncPaymentStatus);
// router.put("/my-orders/:id/pay", protect, updateMyOrderToPaid); ON HOLD

//admin routes
router.get("/", protect, roleCheck("AdminProduct"), getAllOrders);
router.get("/:id", protect, roleCheck("AdminProduct"), getOrderById);
router.put(
  "/:id/deliver",
  protect,
  roleCheck("AdminProduct"),
  updateOrderToDelivered,
);

module.exports = router;
