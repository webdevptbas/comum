const { snap } = require("../config/midtrans");
const { param } = require("../routes/orderRoutes");

//@desc get SNAP token
//@route POST /api/payment-gateway
//@access private user route (only buyer)
exports.createPayment = async (req, res) => {
  const { orderId, totalPrice } = req.body;

  snap
    .createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: totalPrice,
      },
    })
    .then((transaction) => {
      const transactionToken = transaction.token;
      res.status(201).json({
        message: "Transaction created",
        status: 201,
        transactionToken: transactionToken,
      });
    });
};
