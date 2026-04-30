import AddressSection from "../../Component/CheckoutComponent/AddressSection";
import ShippingMethod from "../../Component/CheckoutComponent/ShippingMethod";
import CartOverview from "../../Component/CheckoutComponent/CartOverview";
import SummaryCard from "../../Component/CheckoutComponent/SummaryCard";
import "./Checkout.css";
import { message, Steps } from "antd";
import { useEffect, useState } from "react";
import { saveShippingMethod, setShippingPrice } from "../../Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "../../Util/useMediaQuery";
import { districtCalculateCost } from "../../Util/apiService";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { shippingAddress, totalWeight, shippingMethod } = useSelector(
    (state) => state.cart,
  );

  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethod || null,
  );
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (shippingMethod) {
      setSelectedShipping(shippingMethod);
    }
  }, [shippingMethod]);

  useEffect(() => {
    if (selectedShipping) {
      dispatch(setShippingPrice(selectedShipping.cost));
    }
  }, [selectedShipping]);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        if (!shippingAddress?.district?.value || !totalWeight) return;

        const payload = {
          destination: shippingAddress.district.value,
          weight: totalWeight,
        };

        const res = await districtCalculateCost(payload);
        setShippingOptions(res?.data || []);
      } catch (err) {
        message.error(err);
      }
    };

    fetchShipping();
  }, [shippingAddress, totalWeight]);

  const handleShippingMethod = async (value) => {
    setSelectedShipping(value);
    dispatch(saveShippingMethod(value));
  };

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
          <AddressSection />
          <ShippingMethod
            onChange={handleShippingMethod}
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
