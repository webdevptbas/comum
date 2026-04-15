import React from "react";
import { Button } from "antd";
import { formatRupiah } from "../../../Util/CartUtils";
import { useNavigate } from "react-router";

const CartFooter = ({ cartItems, onClose }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-popup-footer">
      <div className="cart-popup-total">
        <span className="text-l-regular">
          Total Price ({cartItems.length} Items)
        </span>

        <span className="total-price heading5">{formatRupiah(totalPrice)}</span>
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
        onClick={() => {
          navigate("/login?redirect=/checkout");
          onClose();
        }}
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartFooter;
