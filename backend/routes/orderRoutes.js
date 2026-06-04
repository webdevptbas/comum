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
} = require("../controllers/orderController");
const { protect, roleCheck } = require("../middleware/authMiddleware");

//Private routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/my-orders/:id", protect, getMyOrderById);
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
