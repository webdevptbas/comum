import { Outlet } from "react-router";
import CheckoutSteps from "./CheckoutSteps";
import "./CheckoutLayout.css";

const CheckoutLayout = ({ currentStep }) => {
  return (
    <div className="checkout-layout">
      <CheckoutSteps currentStep={currentStep} />
      <Outlet />
    </div>
  );
};

export default CheckoutLayout;
