const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrderById,
  getMyOrders,
  updateMyOrderToPaid,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
  getPaymentStatus,
  syncPaymentStatus,
  paymentNotification,
} = require("../controllers/orderController");
const {
  protect,
  protectAdmin,
  roleCheck,
} = require("../middleware/authMiddleware");

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
router.get("/", protectAdmin, roleCheck("AdminProduct"), getAllOrders);
router.get("/:id", protectAdmin, roleCheck("AdminProduct"), getOrderById);
router.put(
  "/:id/status",
  protectAdmin,
  roleCheck("AdminProduct"),
  updateOrderStatus,
);

module.exports = router;
