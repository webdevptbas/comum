const Order = require("../models/Order");

// @desc create Order
// @route POST /api/orders
// @access private route
exports.createOrder = async (req, res) => {
  res.send("create new order");
};

// @desc get logged in user's orders
// @route GET /api/orders/my-orders
// @access private route
exports.getMyOrders = async (req, res) => {
  res.send("list of all my order(s)");
};

// @desc get logged in user's order by ID
// @route GET /api/orders/my-orders/:id
// @access private route
exports.getMyOrderById = async (req, res) => {
  res.send(`get my order by ID of => ${req.id}`);
};

// @desc update order to paid
// @route PUT /api/orders/my-orders/:id/pay
// @access private route
exports.updateMyOrderToPaid = async (req, res) => {
  res.send(`update my order status to paid by ID of => ${req.id}`);
};

// ----------ADMIN CONTROLLER----------

// @desc get all orders
// @route GET /api/orders
// @access private/admin route
exports.getAllOrders = async (req, res) => {
  res.send("list of all users order(s)");
};

// @desc get order by id
// @route GET /api/orders/:id
// @access private/admin route
exports.getOrderById = async (req, res) => {
  res.status(200).json({
    whatTheDawgDoin: `get my order by ID of => ${req.id}`,
    whatTheBodyRequesting: req.body,
  });
};

// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access private/admin route
exports.updateOrderToDelivered = async (req, res) => {
  res.send(
    `update customer delivery status to delivered by ID of => ${req.id}`,
  );
};
