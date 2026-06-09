const statusConfig = {
  success: {
    icon: "✓",
    title: "Payment Successful",
    description:
      "Your payment has been received successfully. We are preparing your order.",
    primaryText: "View Order",
    primaryLink: "/profile/my-orders",
    secondaryText: "Continue Shopping",
    secondaryLink: "/shop",
  },

  pending: {
    icon: "⏳",
    title: "Payment Pending",
    description: "We're waiting for your payment confirmation.",
    primaryText: "Pay Again",
    primaryLink: "/checkout/:id",
    secondaryText: "View Order",
    secondaryLink: "/profile/my-orders",
  },

  failed: {
    icon: "✕",
    title: "Payment Failed",
    description: "Unfortunately we couldn't process your payment.",
    primaryText: "Back to Shop",
    primaryLink: "/shop",
    secondaryText: "View Order",
    secondaryLink: "/profile/my-orders",
  },
};

export default statusConfig;
