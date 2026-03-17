import React, { useState } from "react";
import { Badge, Button, Drawer, Dropdown, InputNumber, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { ComumHomeBlue } from "../../Icons";
import MobileMenuOverlay from "./MobileMenuOverlay";
import "./Header.css";
import { useNavigate } from "react-router";
import { DeleteItemConfirmation, formatRupiah } from "../../Util/CartUtils";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose, MdOutlineShoppingCart } from "react-icons/md";
import { removeFromCart, updateCartQuantity } from "../../Slices/cartSlice";
import { FaRegUser } from "react-icons/fa";

const { Header } = Layout;

const MobileHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openCart = () => setIsCartVisible(true);
  const closeCart = () => setIsCartVisible(false);

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
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Header
        className="mobile-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          width: "100%",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          backgroundColor: "#fff",
        }}
      >
        <MenuOutlined
          onClick={() => setDrawerVisible(true)}
          className="menu-icon"
        />
        <div onClick={() => navigate("/")} className="logo">
          <ComumHomeBlue height="31" width="auto" />
        </div>
        <div className="utilities">
          <FaRegUser
            style={{ fontSize: "20px" }}
            onClick={() => navigate("/profile")}
          />
          {/* <Dropdown
              menu={{ items: dropdownItem }}
              trigger={["click"]}
              placement="bottomRight"
            >
            </Dropdown> */}
          <>
            {cartItems.length > 0 ? (
              <Badge
                count={cartItems.reduce((a, c) => a + c.quantity, 0)}
                onClick={openCart}
              >
                <MdOutlineShoppingCart style={{ fontSize: "20px" }} />
              </Badge>
            ) : (
              <MdOutlineShoppingCart
                style={{ fontSize: "20px" }}
                onClick={openCart}
              />
            )}
          </>
        </div>
      </Header>

      <Drawer
        title={null}
        placement="left"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="mobile-menu-drawer"
      >
        <MobileMenuOverlay closeMenu={() => setDrawerVisible(false)} />
      </Drawer>

      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={closeCart}
        open={isCartVisible}
        size="large"
        closeIcon={false}
        extra={
          <div
            className="clickable"
            onClick={closeCart}
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
                    closeCart();
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
                closeCart();
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
                  onClose={cancelDeleteHandler}
                  description={`Remove "${selectedItem?.productName} - ${selectedItem?.size}" from cart?`}
                />
    </>
  );
};

export default MobileHeader;
