import React, { useState } from "react";
import { Layout, Menu, Dropdown, Drawer, Input } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CoffeeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { MdSportsTennis } from "react-icons/md";
import "./Header.css";
import { useLocation, useNavigate } from "react-router";
import menuItems from "./headerItem";
import { ComumHomeBlue } from "../../Icons/index.js";
import dropdownItem from "./userDropdownItem.js";

const { Header } = Layout;

const DesktopHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCoffeePage = location.pathname.startsWith("/coffee");
  const isSimulatorPage = location.pathname.startsWith("/simulator");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const openCart = () => setIsCartVisible(true);
  const closeCart = () => setIsCartVisible(false);

  const handleSearch = () => {
    console.log("Searching for: ", searchValue);
  };
  const cartItems = [];
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
              <CoffeeOutlined style={{ color: "#3267e3", fontSize: "20px" }} />
            ) : (
              <CoffeeOutlined />
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
          {/* <div className="vertical-divider" />
          <div className="utilities">
            <Dropdown
              dropdownRender={() => dropdownContent}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <SearchOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
            </Dropdown>
            <Dropdown
              menu={{ items: dropdownItem }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <UserOutlined style={{ fontSize: "20px" }} />
            </Dropdown>
            <ShoppingCartOutlined
              style={{ fontSize: "20px" }}
              onClick={openCart}
            />
          </div> */}

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
                <CloseOutlined />
                <div>Close</div>
              </div>
            }
          >
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
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
