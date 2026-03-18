import React, { useState } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Drawer,
  Input,
  Badge,
  InputNumber,
  Button,
} from "antd";
import {
  MdSportsTennis,
  MdSearch,
  MdOutlineShoppingCart,
  MdOutlineClose,
} from "react-icons/md";
import { FiCoffee, FiTrash2 } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import "./Header.css";
import "../../index.css";
import { useLocation, useNavigate } from "react-router";
import menuItems from "./headerItem";
import { ComumHomeBlue } from "../../Icons/index.js";
import dropdownItem from "./userDropdownItem.js";
import { useDispatch, useSelector } from "react-redux";
import { DeleteItemConfirmation, formatRupiah } from "../../Util/CartUtils.js";
import { removeFromCart, updateCartQuantity } from "../../Slices/cartSlice.js";

const { Header } = Layout;

const DesktopHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCoffeePage = location.pathname.startsWith("/coffee");
  const isSimulatorPage = location.pathname.startsWith("/simulator");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openCart = () => setIsCartVisible(true);
  const closeCart = () => setIsCartVisible(false);

  const handleSearch = () => {
    console.log("Searching for: ", searchValue);
  };

  const dropdownContent = (
    <div style={{ padding: "8px", width: "250px", backgroundColor: "white" }}>
      <Input.Search
        placeholder="Search products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        enterButton
      />
    </div>
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
    navigate("/login?redirect=/shipping");
  };

  const handleUserClick = () => {
    if (!userInfo) {
      navigate("/login");
    }
  };

  return (
    <>
      <Header className="header scrolled">
        <div className="main-menu-container header-container">
          <div
            className="logo-container"
            onClick={() => {
              navigate("/");
            }}
          >
            <ComumHomeBlue height="31" width="auto" />
          </div>
          <div className="menu-container">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[
                menuItems.find((item) => location.pathname.startsWith(item.key))
                  ?.key,
              ]}
              items={menuItems}
              onClick={({ key }) => {
                navigate(key);
              }}
            />
          </div>
        </div>
        <div className="utilities-container header-container">
          <div
            className={`coffee ${isCoffeePage ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/coffee")}
          >
            {isCoffeePage ? (
              <FiCoffee style={{ color: "#3267e3", fontSize: "20px" }} />
            ) : (
              <FiCoffee />
            )}
            Comum Coffee
          </div>
          <div
            className={`coffee ${isSimulatorPage ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/simulator")}
          >
            {isSimulatorPage ? (
              <MdSportsTennis style={{ color: "#3267e3", fontSize: "20px" }} />
            ) : (
              <MdSportsTennis />
            )}
            Comum Simulator
          </div>
          <div className="vertical-divider" />
          <div className="utilities">
            <Dropdown
              dropdownRender={() => dropdownContent}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <MdSearch style={{ fontSize: "20px", cursor: "pointer" }} />
            </Dropdown>
            {userInfo ? (
              <Dropdown
                menu={{ items: dropdownItem }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <FaRegUser style={{ fontSize: "20px", cursor: "pointer" }} />
              </Dropdown>
            ) : (
              <FaRegUser
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={handleUserClick}
              />
            )}
            <>
              {cartItems.length > 0 ? (
                <Badge
                  count={cartItems.reduce((a, c) => a + c.quantity, 0)}
                  onClick={openCart}
                  style={{ cursor: "pointer" }}
                >
                  <MdOutlineShoppingCart
                    style={{ fontSize: "20px", cursor: "pointer" }}
                  />
                </Badge>
              ) : (
                <MdOutlineShoppingCart
                  style={{ fontSize: "20px" }}
                  onClick={openCart}
                />
              )}
            </>
          </div>

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
        </div>
      </Header>
    </>
  );
};

export default DesktopHeader;
