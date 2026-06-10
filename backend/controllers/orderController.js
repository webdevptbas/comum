const { snap } = require("../config/midtrans");
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

    //get SNAP token
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: createOrder?.orderId,
        gross_amount: createOrder?.totalPrice,
      },
      customer_details: {
        first_name: req?.user?.name,
        email: req?.user?.email,
        phone: req?.user?.phone,
      },
    });

    //saving snap token on Order model
    createOrder.snapToken = transaction.token;
    await createOrder.save();

    res
      .status(201)
      .json({ ...createOrder.toObject(), snapToken: transaction.token });
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

// @desc Get payment status from Midtrans
// @route GET /api/orders/my-orders/:orderId/payment-status
// @access Private
exports.getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const status = await snap.transaction.status(order.orderId);

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Sync payment status from Midtrans on FE
// @route PUT /api/orders/my-orders/:orderId/sync-payment
// @access Private
exports.syncPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const status = await snap.transaction.status(order.orderId);

    const transactionStatus = status.transaction_status;

    order.paymentResult = {
      id: status.transaction_id,
      status: transactionStatus,
      fraudStatus: status.fraud_status,
      grossAmount: status.gross_amount,
      currency: status.currency,
      paymentType: status.payment_type,
      issuer: status.issuer,
      acquirer: status.acquirer,
      transactionTime: status.transaction_time,
      settlementTime: status.settlement_time,
    };

    switch (transactionStatus) {
      case "settlement":
      case "capture":
        order.isPaid = true;
        order.paidAt = status.settlement_time;

        order.orderStatus = "paid";
        break;

      case "pending":
        order.isPaid = false;
        order.orderStatus = "pending";
        break;

      case "deny":
      case "cancel":
      case "expire":
      case "failure":
        order.isPaid = false;
        order.orderStatus = "cancelled";
        break;

      default:
        break;
    }

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc update order to paid
// @route PUT /api/orders/my-orders/:id/pay
// @access private route
exports.updateMyOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      emailAddress: req.body.emailAddress,
    };
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({
      message: "Order not found",
      status: 404,
    });
  }
};

// ----------ADMIN CONTROLLER----------

// @desc get all orders
// @route GET /api/orders
// @access private/admin route
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
