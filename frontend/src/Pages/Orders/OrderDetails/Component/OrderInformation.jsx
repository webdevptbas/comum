import "../OrderDetails.css";
import "../../../../index.css";

export const OrderInformation = ({ order }) => {
  return (
    <>
      {/* Order Information */}
      <div className="order-section">
        <div className="order-section-title-row">
          <h4 className="heading4">Order Information</h4>

          <div className={`order-status-badge ${order?.orderStatus}`}>
            {order?.orderStatus.toUpperCase()}
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <label className="text-m-regular">Order ID</label>
            <p className="text-l-medium">{order?.orderId}</p>
          </div>

          <div>
            <label className="text-m-regular">Order Date</label>
            <p className="text-l-medium">
              {new Date(order?.createdAt)?.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZone: "Asia/Jakarta",
              })}
            </p>
          </div>

          <div>
            <label className="text-m-regular">Paid At</label>
            <p className="text-l-medium">{order?.paidAt}</p>
          </div>
        </div>
      </div>
    </>
  );
};
