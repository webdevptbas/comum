import "../OrderDetails.css";
import "../../../../index.css";

export const PaymentInformation = ({ order }) => {
  return (
    <>
      <div className="order-section">
        <h4 className="heading4">Payment Information</h4>

        <div className="detail-grid">
          <div>
            <label className="text-m-regular">Transaction ID</label>
            <p className="text-l-medium">
              {order?.paymentResult?.id?.toUpperCase()}
            </p>
          </div>

          <div>
            <label className="text-m-regular">Payment Status</label>
            <p className="text-l-medium">
              {order?.paymentResult?.status?.toUpperCase()}
            </p>
          </div>

          <div>
            <label className="text-m-regular">Payment Type</label>
            <p className="text-l-medium">
              {order?.paymentResult?.paymentType?.toUpperCase()}
            </p>
          </div>

          <div>
            <label className="text-m-regular">Transaction Created</label>
            <p className="text-l-medium">
              {order?.paymentResult?.transactionTime?.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
