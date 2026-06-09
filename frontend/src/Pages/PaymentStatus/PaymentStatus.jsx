import { useNavigate, useSearchParams } from "react-router";
import StatusCard from "./StatusCard/StatusCard";
import { useSyncPaymentStatusMutation } from "../../Slices/ordersApiSlice";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";

const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const orderId = searchParams.get("order_id");
  const [syncPaymentStatus, { isLoading }] = useSyncPaymentStatusMutation();

  useEffect(() => {
    const syncPayment = async () => {
      try {
        if (!orderId) return;

        const updatedOrder = await syncPaymentStatus(orderId).unwrap();

        setOrder(updatedOrder);
      } catch (err) {
        message.error(err?.data?.message || "Failed to sync payment status");
      }
    };

    syncPayment();
  }, [orderId, syncPaymentStatus]);

  const getStatusType = () => {
    const transactionStatus = order?.paymentResult?.status;

    switch (transactionStatus) {
      case "settlement":
      case "capture":
        return "success";

      case "pending":
        return "pending";

      case "deny":
      case "cancel":
      case "expire":
      case "failure":
        return "failed";

      default:
        return "pending";
    }
  };

  if (isLoading) {
    return (
      <div
        className="completed-page"
        style={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="completed-page">
      <StatusCard status={getStatusType()} orderId={orderId} />
    </div>
  );
};

export default PaymentStatusPage;
