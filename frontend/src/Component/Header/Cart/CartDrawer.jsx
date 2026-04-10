import React, { useState } from "react";
import { Drawer, InputNumber, Button } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../../../Slices/cartSlice";
import { formatRupiah, DeleteItemConfirmation } from "../../../Util/CartUtils";
import { useNavigate } from "react-router";

const CartDrawer = ({ open, onClose, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const confirmationPopupModal = (item) => {
    setSelectedItem(item);
    setDeleteConfirmation(true);
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(selectedItem._id));
    setDeleteConfirmation(false);
  };

  const cancelDeleteHandler = () => {
    setDeleteConfirmation(false);
    setSelectedItem(null);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
    onClose();
  };

  return (
    <>
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
        closeIcon={false}
        extra={
          <div
            className="clickable"
            onClick={onClose}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            <MdOutlineClose />
            <div className="heading6">Close</div>
          </div>
        }
        className="heading4"
      >
        <div className="cart-popup-wrapper">
          {/* SCROLLABLE ITEMS */}
          <div className="cart-popup-items text-l-regular">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="cart-popup-item">
                  {/* IMAGE */}
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="cart-popup-image"
                  />

                  {/* INFO */}
                  <div className="cart-popup-info">
                    <div className="cart-popup-title heading6">
                      {item.productName} - {item.size}
                    </div>

                    {/* QUANTITY */}
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

                    {/* PRICE */}
                    <div className="cart-popup-price">
                      <span className="cart-popup-final-price heading6">
                        {formatRupiah(
                          item.isDiscount ? item.discountPrice : item.price,
                        )}
                      </span>

                      {item.isDiscount && (
                        <>
                          <span className="cart-discount text-m-medium">
                            {item.discount}%
                          </span>

                          <span className="original-price text-m-regular">
                            {formatRupiah(item.originalPrice)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* DELETE */}
                  <FiTrash2
                    className="cart-popup-delete"
                    onClick={() => confirmationPopupModal(item)}
                  />
                </div>
              ))
            ) : (
              <p>
                Your cart is empty. Explore{" "}
                <span
                  onClick={() => {
                    navigate("/shop");
                    onClose();
                  }}
                  className="link"
                  style={{ textDecoration: "underline" }}
                >
                  Shop
                </span>
              </p>
            )}
          </div>

          {/* FIXED FOOTER */}
          <div className="cart-popup-footer">
            <div className="cart-popup-total">
              <span className="text-l-regular">
                Total Price ({cartItems.length} Items)
              </span>

              <span className="total-price heading5">
                {formatRupiah(
                  cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                  ),
                )}
              </span>
            </div>

            <Button
              className="view-cart-btn text-button-regular"
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
            >
              View Cart
            </Button>

            <Button
              className="checkout-btn text-button-regular"
              disabled={cartItems.length === 0}
              onClick={() => checkoutHandler()}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Drawer>

      <DeleteItemConfirmation
        open={deleteConfirmation}
        onOk={removeFromCartHandler}
        onClose={() => setDeleteConfirmation(false)}
        description={description}
      />
    </>
  );
};

export default CartDrawer;
