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
