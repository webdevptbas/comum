import { useParams } from "react-router";
import { useGetMyOrderDetailsQuery } from "../../../Slices/ordersApiSlice";
import "./OrderDetails.css";
import { message, Skeleton } from "antd";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetMyOrderDetailsQuery(orderId);

  console.log({ order });

  return isLoading ? (
    <Skeleton />
  ) : error ? (
    message.error(error)
  ) : (
    <>
      <div className="order-details-page-container">
        <h2 className="heading2 order-details-title">Order Details Page</h2>
      </div>
    </>
  );
};

export default OrderDetailsPage;
