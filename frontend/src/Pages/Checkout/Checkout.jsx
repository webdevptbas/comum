import AddressSection from "../../Component/CheckoutComponent/AddressSection";
import ShippingMethod from "../../Component/CheckoutComponent/ShippingMethod";
import CartOverview from "../../Component/CheckoutComponent/CartOverview";
import SummaryCard from "../../Component/CheckoutComponent/SummaryCard";
import "./Checkout.css";
import { message } from "antd";
import { useEffect, useState } from "react";
import {
  saveShippingMethod,
  setShippingPrice,
  clearCartItems,
} from "../../Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { districtCalculateCost } from "../../Util/apiService";
import { useCreateOrderMutation } from "../../Slices/ordersApiSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const {
    shippingAddress,
    totalWeight,
    shippingMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethod || null,
  );

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

  const handleCheckout = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        shippingMethod: shippingMethod,
        totalWeight: totalWeight,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <div className="checkout-page-container">
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
          <SummaryCard
            onClick={handleCheckout}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
