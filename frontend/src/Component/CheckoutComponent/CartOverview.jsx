import { Card, List } from "antd";
import { useSelector } from "react-redux";
import { formatRupiah } from "../../Util/CartUtils";
import useMediaQuery from "../../Util/useMediaQuery";

const CartOverview = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <Card className="checkout-card">
      <h5 className="checkout-cart-overview heading5">Cart Overview</h5>

      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item className="checkout-cart-item">
            <div className="checkout-cart-info">
              {isMobile ? (
                <>
                  <div className="checkout-cart-name">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="cart-popup-image"
                    />
                    <div className="checkout-cart-information-mobile">
                      <h6 className="heading6 checkout-cart-title">
                        {item.productName} - {item.size}
                      </h6>
                      {/* PRICE */}
                      <div className="checkout-cart-price-mobile">
                        {item.isDiscount && (
                          <div className="checkout-cart-discount">
                            <span className="cart-discount text-m-medium">
                              {item.discount}%
                            </span>
                            <span className="original-price text-m-regular">
                              {formatRupiah(item.originalPrice)}
                            </span>
                          </div>
                        )}
                        <span className="cart-popup-final-price heading6">
                          {formatRupiah(
                            item.isDiscount ? item.discountPrice : item.price,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-l-regular"> x {item.quantity}</p>
                </>
              ) : (
                <>
                  <div className="checkout-cart-name">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="cart-popup-image"
                    />
                    <h6 className="heading6 checkout-cart-title">
                      {item.productName} - {item.size}
                    </h6>
                    <p className="text-l-regular"> x {item.quantity}</p>
                  </div>
                  {/* PRICE */}
                  <div className="checkout-cart-price">
                    {item.isDiscount && (
                      <div className="checkout-cart-discount">
                        <span className="cart-discount text-m-medium">
                          {item.discount}%
                        </span>
                        <span className="original-price text-m-regular">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      </div>
                    )}
                    <span className="cart-popup-final-price heading6">
                      {formatRupiah(
                        item.isDiscount ? item.discountPrice : item.price,
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CartOverview;
