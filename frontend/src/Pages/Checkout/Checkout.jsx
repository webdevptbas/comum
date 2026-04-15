import AddressSection from "../../Component/CheckoutComponent/AddressSection";
import ShippingMethod from "../../Component/CheckoutComponent/ShippingMethod";
import CartOverview from "../../Component/CheckoutComponent/CartOverview";
import SummaryCard from "../../Component/CheckoutComponent/SummaryCard";
import "./Checkout.css";
import { Steps } from "antd";

const CheckoutPage = () => {
  return (
    <div className="checkout-page-container">
      {/* STEP INDICATOR */}
      <div className="checkout-steps">
        <Steps
          current={0}
          items={[
            { title: "Checkout" },
            { title: "Payment" },
            { title: "Complete" },
          ]}
        />
      </div>

      <div className="checkout-container">
        {/* LEFT */}
        <div className="checkout-left">
          <AddressSection />
          <ShippingMethod />
          <CartOverview />
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <SummaryCard />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
