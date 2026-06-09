import { useNavigate, useParams } from "react-router";
import { useGetMyOrderDetailsQuery } from "../../../Slices/ordersApiSlice";
import "./OrderDetails.css";
import "../../../index.css";
import { Button, message, Skeleton } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

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
    <div>Failed to load order details.</div>
  ) : (
    <>
      <div className="order-details-page-container">
        {/* Back Button */}
        <div
          className="order-details-back-button"
          onClick={() => navigate("/profile/my-orders")}
        >
          <FaArrowLeftLong />
          <div>Back to Orders</div>
        </div>

        {/* Order Information */}
        <div className="order-section">
          <div className="order-section-title-row">
            <h4>Order Information</h4>

            <div className={`order-status-badge ${order.orderStatus}`}>
              {order.orderStatus.toUpperCase()}
            </div>
          </div>

          <div className="detail-grid">
            <div>
              <label>Order ID</label>
              <p>{order.orderId}</p>
            </div>

            <div>
              <label>Order Date</label>
              <p>{new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
            </div>

            <div>
              <label>Paid At</label>
              <p>
                {order.paidAt
                  ? new Date(order.paidAt).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="order-section">
          <h4>Products</h4>

          {order.orderItems.map((item) => (
            <div key={item._id} className="order-product-row">
              <img src={item.imageUrl} alt={item.productName} />

              <div className="product-info">
                <h5>{item.productName}</h5>

                <p>Item Code: {item.itemCode}</p>

                <p>Size: {item.size}</p>

                <p>Quantity: {item.quantity}</p>

                <p>Weight: {item.weight} g</p>
              </div>

              <div className="product-price">
                Rp
                {item.price.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>

        <div className="order-shipping-section">
          {/* Shipping Address */}
          <div className="order-section">
            <h4>Shipping Address</h4>

            <div className="shipping-card">
              <strong>{order.user?.name}</strong>

              <p>{order.user?.email}</p>

              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.subdistrict.label},{" "}
                {order.shippingAddress.district.label}
              </p>

              <p>
                {order.shippingAddress.city.label},{" "}
                {order.shippingAddress.province.label}
              </p>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="order-section">
            <h4>Shipping Method</h4>

            <div className="shipping-card">
              <div>
                <label>Courier</label>

                <p>{order.shippingMethod.name}</p>
              </div>

              <div>
                <label>Service</label>

                <p>{order.shippingMethod.service}</p>
              </div>

              <div>
                <label>Estimated Delivery</label>

                <p>{order.shippingMethod.etd}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="order-section">
          <h4>Payment Information</h4>

          <div className="detail-grid">
            <div>
              <label>Payment Status</label>

              <p>{order.paymentResult?.status}</p>
            </div>

            <div>
              <label>Payment Type</label>

              <p>{order.paymentResult?.paymentType}</p>
            </div>

            <div>
              <label>Fraud Status</label>

              <p>{order.paymentResult?.fraudStatus}</p>
            </div>

            <div>
              <label>Transaction ID</label>

              <p>{order.paymentResult?.id}</p>
            </div>

            <div>
              <label>Transaction Time</label>

              <p>{order.paymentResult?.transactionTime}</p>
            </div>

            <div>
              <label>Settlement Time</label>

              <p>{order.paymentResult?.settlementTime || "-"}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-section order-summary-card">
          <h4>Order Summary</h4>

          <div className="summary-row">
            <span>Items Total</span>

            <span>
              Rp
              {order.itemsPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping Cost</span>

            <span>
              Rp
              {order.shippingPrice.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="summary-row total">
            <span>Total Payment</span>

            <span>
              Rp
              {order.totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
