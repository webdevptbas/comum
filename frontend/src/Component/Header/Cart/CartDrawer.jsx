import React, { useCallback, useState } from "react";
import { Drawer } from "antd";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../Slices/cartSlice";
import { DeleteItemConfirmation } from "../../../Util/CartUtils";
import { useNavigate } from "react-router";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const confirmationPopupModal = useCallback((item) => {
    setSelectedItem(item);
    setDeleteConfirmation(true);
  }, []);

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(selectedItem._id));
    setDeleteConfirmation(false);
  };

  const cancelDeleteHandler = () => {
    setDeleteConfirmation(false);
    setSelectedItem(null);
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
                <CartItem
                  key={item._id}
                  item={item}
                  onDelete={confirmationPopupModal}
                />
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

          <CartFooter cartItems={cartItems} onClose={onClose} />
        </div>
      </Drawer>

      <DeleteItemConfirmation
        open={deleteConfirmation}
        onOk={removeFromCartHandler}
        onClose={cancelDeleteHandler}
        description={`Remove "${selectedItem?.productName} - ${selectedItem?.size}" from cart?`}
      />
    </>
  );
};

export default CartDrawer;
