import { IoWalletOutline, IoCloseCircleOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";

const statusConfig = {
  success: {
    icon: <LiaShippingFastSolid />,
    title: "Thank You!",
    description: "Your order has been successfully placed.",
    primaryText: "View Order",
    primaryLink: "/profile/my-orders",
    secondaryText: "Continue Shopping",
    secondaryLink: "/shop",
  },

  pending: {
    icon: <IoWalletOutline />,
    title: "Waiting For Payment",
    description: "Please complete your payment to process your order",
    primaryText: "Pay Again",
    primaryLink: "/checkout/:id",
    secondaryText: "View Order",
    secondaryLink: "/profile/my-orders",
  },

  failed: {
    icon: <IoCloseCircleOutline />,
    title: "Payment Failed",
    description: "Unfortunately we couldn't process your payment.",
    primaryText: "Back to Shop",
    primaryLink: "/shop",
    secondaryText: "View Order",
    secondaryLink: "/profile/my-orders",
  },
};

export default statusConfig;
