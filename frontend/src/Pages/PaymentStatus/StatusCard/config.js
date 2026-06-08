const statusConfig = {
  success: {
    icon: "✓",
    title: "Payment Successful",
    description:
      "Your payment has been received successfully. We are preparing your order.",
    primaryText: "View Order",
    secondaryText: "Continue Shopping",
  },

  pending: {
    icon: "⏳",
    title: "Payment Pending",
    description: "We're waiting for your payment confirmation.",
    primaryText: "Pay Again",
    secondaryText: "View Order",
  },

  failed: {
    icon: "✕",
    title: "Payment Failed",
    description: "Unfortunately we couldn't process your payment.",
    primaryText: "Try Again",
    secondaryText: "View Order",
  },
};

export default statusConfig;
