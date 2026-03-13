import React, { useState } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Drawer,
  Input,
  Badge,
  InputNumber,
  Divider,
} from "antd";
import {
  MdSportsTennis,
  MdSearch,
  MdOutlineShoppingCart,
  MdOutlineClose,
  MdDeleteOutline,
} from "react-icons/md";
import { FiCoffee } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import "./Header.css";
import { useLocation, useNavigate } from "react-router";
import menuItems from "./headerItem";
import { ComumHomeBlue } from "../../Icons/index.js";
import dropdownItem from "./userDropdownItem.js";
import { useSelector } from "react-redux";
import { formatRupiah } from "../../Util/CartUtils.js";

const { Header } = Layout;

const DesktopHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCoffeePage = location.pathname.startsWith("/coffee");
  const isSimulatorPage = location.pathname.startsWith("/simulator");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  console.log({ cartItems });

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
            <Dropdown
              menu={{ items: dropdownItem }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <FaRegUser style={{ fontSize: "20px" }} />
            </Dropdown>
            <>
              {cartItems.length > 0 ? (
                <Badge
                  count={cartItems.reduce((a, c) => a + c.quantity, 0)}
                  onClick={openCart}
                >
                  <MdOutlineShoppingCart style={{ fontSize: "20px" }} />
                </Badge>
              ) : (
                <MdOutlineShoppingCart style={{ fontSize: "20px" }} />
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
                <div>Close</div>
              </div>
            }
          >
            {cartItems.length > 0 ? (
              <div className="cart-container">
                {cartItems.map((item) => (
                  <div key={item._id}>
                    <div className="cart-item">
                      {/* Product Image */}
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="cart-image"
                      />

                      {/* Product Info */}
                      <div className="cart-info">
                        <div className="cart-title">
                          {item.productName} - {item.size}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="cart-quantity">
                          <button>-</button>
                          <InputNumber
                            min={1}
                            max={item.stock}
                            value={item.quantity}
                            controls={false}
                          />
                          <button>+</button>
                        </div>

                        {/* Price Section */}
                        <div className="cart-price">
                          <span className="final-price">
                            {formatRupiah(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Delete Icon */}
                      <MdDeleteOutline className="cart-delete" />
                    </div>

                    <Divider />
                  </div>
                ))}
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </Drawer>
        </div>
      </Header>
    </>
  );
};

export default DesktopHeader;
