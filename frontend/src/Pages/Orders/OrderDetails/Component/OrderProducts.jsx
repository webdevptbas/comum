import "../OrderDetails.css";
import "../../../../index.css";
import useMediaQuery from "../../../../Util/useMediaQuery";

export const OrderProducts = ({ order }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <div className="order-section">
        <h4 className="heading4">Products</h4>

        {isMobile ? (
          <>
            {order?.orderItems?.map((item) => (
              <div key={item?._id} className="order-product-row">
                <div className="order-product-row-title">
                  <img src={item?.imageUrl} alt={item?.productName} />
                  <h5 className="heading5">{item?.productName}</h5>
                </div>
                <div className="order-product-row-body">
                  <div className="product-info">
                    <p className="text-m-regular">
                      Item Code: {item?.itemCode}
                    </p>
                    <p className="text-m-regular">Size: {item?.size}</p>
                    <p className="text-m-regular">Quantity: {item?.quantity}</p>
                    <p className="text-m-regular">Weight: {item?.weight} g</p>
                  </div>
                  <div className="text-l-medium">
                    {item?.isDiscount ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                        }}
                      >
                        <div>Rp {item?.price?.toLocaleString("id-ID")}</div>
                        <label
                          className="text-m-regular"
                          style={{ textDecoration: "line-through" }}
                        >
                          Rp {item?.originalPrice?.toLocaleString("id-ID")}
                        </label>
                      </div>
                    ) : (
                      <div>Rp {item?.price?.toLocaleString("id-ID")}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {order?.orderItems?.map((item) => (
              <div key={item?._id} className="order-product-row">
                <img src={item?.imageUrl} alt={item?.productName} />
                <div className="product-info">
                  <h5 className="heading5">{item?.productName}</h5>
                  <p className="text-m-regular">Item Code: {item?.itemCode}</p>
                  <p className="text-m-regular">Size: {item?.size}</p>
                  <p className="text-m-regular">Quantity: {item?.quantity}</p>
                  <p className="text-m-regular">Weight: {item?.weight} g</p>
                </div>
                <div className="text-l-medium">
                  {item?.isDiscount ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                      }}
                    >
                      <div>Rp {item?.price?.toLocaleString("id-ID")}</div>
                      <label
                        className="text-m-regular"
                        style={{ textDecoration: "line-through" }}
                      >
                        Rp {item?.originalPrice?.toLocaleString("id-ID")}
                      </label>
                    </div>
                  ) : (
                    <div>Rp {item?.price?.toLocaleString("id-ID")}</div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
