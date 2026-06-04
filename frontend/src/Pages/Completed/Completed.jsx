import { useSearchParams } from "react-router";
import StatusCard from "./StatusCard/StatusCard";

const CompletedPage = () => {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");

  const transactionStatus = searchParams.get("transaction_status");

  const getStatusType = () => {
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

  return (
    <div className="completed-page">
      <StatusCard status={getStatusType()} orderId={orderId} />
    </div>
  );
};

export default CompletedPage;
