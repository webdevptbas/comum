import { useNavigate, useParams } from "react-router";
import { useGetMyOrderDetailsQuery } from "../../../Slices/ordersApiSlice";
import "./OrderDetails.css";
import "../../../index.css";
import { Skeleton } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { OrderInformation } from "./Component/OrderInformation";
import { OrderProducts } from "./Component/OrderProducts";
import { ShippingAddress } from "./Component/ShippingAddress";
import { PaymentInformation } from "./Component/PaymentInformation";
import { OrderSummary } from "./Component/OrderSummary";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetMyOrderDetailsQuery(orderId);

  return isLoading ? (
    <Skeleton />
  ) : error ? (
    <div>Failed to load order details.</div>
  ) : (
    <>
      <div className="order-details-page-container">
        {/* Back Button */}
        <div
          className="order-details-back-button text-m-regular"
          onClick={() => navigate("/profile/my-orders")}
        >
          <FaArrowLeftLong />
          <div>Back to Orders</div>
        </div>

        {/* Order Information */}
        <OrderInformation order={order} />

        {/* Products */}
        <OrderProducts order={order} />

        {/* Shipping Address */}
        <ShippingAddress order={order} />

        {/* Payment */}
        <PaymentInformation order={order} />

        {/* Order Summary */}
        <OrderSummary order={order} />
      </div>
    </>
  );
};

export default OrderDetailsPage;
