const Order = require("../models/Order");

// @desc create Order
// @route POST /api/orders
// @access private route
exports.createOrder = async (req, res) => {};

// @desc get logged in user's orders
// @route GET /api/orders/my-orders
// @access private route
exports.getMyOrders = async (req, res) => {};

// @desc get logged in user's order by ID
// @route GET /api/orders/my-orders/:id
// @access private route
exports.getMyOrderById = async (req, res) => {};

// @desc update order to paid
// @route GET /api/orders/my-orders/:id/pay
// @access private route
exports.updateMyOrderToPaid = async (req, res) => {};

// @desc update order to delivered
// @route GET /api/orders/my-orders/:id/deliver
// @access private/admin route
exports.updateMyOrderToDelivered = async (req, res) => {};

// @desc get all orders
// @route GET /api/orders
// @access private/admin route
exports.getAllOrders = async (req, res) => {};
