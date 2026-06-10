import "../OrderDetails.css";
import "../../../../index.css";

export const ShippingAddress = ({ order }) => {
  return (
    <>
      <div className="order-section">
        <h4 className="heading4">Shipping</h4>

        <div className="detail-grid">
          <div>
            <label className="text-m-regular">Receiver Name</label>
            <strong className="text-l-medium">{order?.user?.name}</strong>
          </div>

          <div>
            <label className="text-m-regular">Address</label>
            <p className="text-l-regular">
              {order?.shippingAddress?.address?.toUpperCase()},{" "}
              {order?.shippingAddress?.subdistrict?.label &&
                order?.shippingAddress?.subdistrict?.label}
              , {order?.shippingAddress?.district?.label},{" "}
              {order?.shippingAddress?.city?.label},{" "}
              {order?.shippingAddress?.province?.label}
            </p>
          </div>

          <div>
            <label className="text-m-regular">Courier</label>
            <p className="text-l-regular">{order?.shippingMethod?.name}</p>
          </div>

          <div>
            <label className="text-m-regular">Service</label>
            <p className="text-l-regular">{order?.shippingMethod?.service}</p>
          </div>
        </div>
      </div>
    </>
  );
};
