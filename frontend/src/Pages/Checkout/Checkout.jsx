import AddressSection from "../../Component/CheckoutComponent/AddressSection";
import ShippingMethod from "../../Component/CheckoutComponent/ShippingMethod";
import CartOverview from "../../Component/CheckoutComponent/CartOverview";
import SummaryCard from "../../Component/CheckoutComponent/SummaryCard";
import "./Checkout.css";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import { setShippingPrice } from "../../Slices/cartSlice";
import { useDispatch } from "react-redux";
import useMediaQuery from "../../Util/useMediaQuery";

const CheckoutPage = () => {
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedShipping) {
      dispatch(setShippingPrice(selectedShipping.cost));
    }
  }, [selectedShipping]);

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
          type="dot"
          variant="outlined"
          titlePlacement="vertical"
          size="medium"
          orientation="horizontal"
        />
      </div>

      <div className="checkout-container">
        {/* LEFT */}
        <div className="checkout-left">
          <AddressSection setShippingOptions={setShippingOptions} />
          <ShippingMethod
            onChange={setSelectedShipping}
            options={shippingOptions}
            value={selectedShipping}
          />
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
