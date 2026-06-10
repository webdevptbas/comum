import "../OrderDetails.css";
import "../../../../index.css";

export const OrderSummary = ({ order }) => {
  return (
    <>
      <div className="order-section order-summary-card">
        <h4 className="heading4">Order Summary</h4>

        <div className="summary-row">
          <span className="text-m-regular">Items Total</span>

          <span className="text-l-medium">
            Rp {order?.itemsPrice?.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="summary-row">
          <span className="text-m-regular">Shipping Cost</span>

          <span className="text-l-medium">
            Rp {order?.shippingPrice?.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="summary-row total">
          <span className="text-m-regular">Total Payment</span>

          <span className="text-l-medium">
            Rp {order?.totalPrice?.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </>
  );
};
