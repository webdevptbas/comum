const Order = require("../models/Order");

// @desc create Order
// @route POST /api/orders
// @access private route
exports.createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    shippingMethod,
    totalWeight,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      message: "There are no order items",
      status: 400,
    });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      shippingMethod,
      totalWeight,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
};

// @desc get logged in user's orders
// @route GET /api/orders/my-orders
// @access private route
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
};

// @desc get logged in user's order by ID
// @route GET /api/orders/my-orders/:id
// @access private route
exports.getMyOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "username name email",
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({
      message: "Order not found",
      status: 404,
    });
  }
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
  const order = await Order.findById(req.params.id).populate(
    "user",
    "username name email",
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({
      message: "Order not found",
      status: 404,
    });
  }
};

// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access private/admin route
exports.updateOrderToDelivered = async (req, res) => {
  res.send(
    `update customer delivery status to delivered by ID of => ${req.id}`,
  );
};
