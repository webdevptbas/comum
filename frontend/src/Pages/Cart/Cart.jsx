import React, { useEffect, useRef, useState } from "react";
import "./Cart.css";
import "../../index.css";
import { InputNumber, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { DeleteItemConfirmation, formatRupiah } from "../../Util/CartUtils";
import { removeFromCart, updateCartQuantity } from "../../Slices/cartSlice";
import { useNavigate } from "react-router";

const CartPage = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const summaryRef = useRef(null);
  const [isAtFooter, setIsAtFooter] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const removeFromCartHandler = async () => {
    dispatch(removeFromCart(selectedItem._id));
    setDeleteConfirmation(false);
  };

  const confirmationPopupModal = (item) => {
    setSelectedItem(item);
    setDeleteConfirmation(true);
  };

  const cancelDeleteHandler = () => {
    setDeleteConfirmation(false);
    setSelectedItem(null);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/checkout");
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const footer = document.querySelector("footer");
          if (!footer) return;

          const footerTop = footer.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const buffer = 50;

          if (footerTop <= windowHeight - buffer) {
            setIsAtFooter(true);
          } else if (footerTop > windowHeight + buffer) {
            setIsAtFooter(false);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* LEFT SIDE */}
        <div className="cart-list">
          <h2>Shopping Cart</h2>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-info-container">
                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="cart-image"
                  />

                  {/* PRODUCT INFO */}
                  <div className="cart-title heading6">
                    {item.productName} - {item.size}
                  </div>
                </div>

                <div className="cart-price-actions-container">
                  {/* PRICE */}
                  <div className="cart-price-section">
                    {item.isDiscount && (
                      <div className="cart-discount-row">
                        <span className="cart-discount-badge">
                          {item.discount}%
                        </span>

                        <span className="cart-original-price">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      </div>
                    )}

                    <div className="cart-final-price heading5">
                      {formatRupiah(
                        item.isDiscount ? item.discountPrice : item.price,
                      )}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="cart-actions">
                    <FiTrash2
                      className="cart-trash-icon"
                      onClick={() => confirmationPopupModal(item)}
                    />

                    <div className="cart-popup-quantity">
                      <button
                        disabled={item.quantity === 1}
                        onClick={() =>
                          dispatch(
                            updateCartQuantity({
                              id: item._id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                      >
                        -
                      </button>

                      <InputNumber
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        controls={false}
                        onChange={(val) =>
                          dispatch(
                            updateCartQuantity({
                              id: item._id,
                              quantity: val,
                            }),
                          )
                        }
                      />

                      <button
                        disabled={item.quantity === item.stock}
                        onClick={() =>
                          dispatch(
                            updateCartQuantity({
                              id: item._id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <p>
                Your cart is empty. Explore{" "}
                <span
                  onClick={() => navigate("/shop")}
                  className="link"
                  style={{ textDecoration: "underline" }}
                >
                  Shop
                </span>
              </p>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`cart-summary ${isAtFooter ? "stop" : ""}`}
          ref={summaryRef}
        >
          <h3>Cart Overview</h3>

          <div className="summary-row">
            <span>Total Price ({cartItems.length} Items)</span>

            <span className="summary-price">{formatRupiah(totalPrice)}</span>
          </div>

          <Button
            className="text-button-regular checkout-btn"
            disabled={cartItems.length === 0}
            onClick={() => checkoutHandler()}
          >
            Checkout
          </Button>
        </div>
      </div>

      <DeleteItemConfirmation
        open={deleteConfirmation}
        onOk={removeFromCartHandler}
        onClose={cancelDeleteHandler}
        description={`Remove "${selectedItem?.productName} - ${selectedItem?.size}" from cart?`}
      />
    </div>
  );
};

export default CartPage;
