import React from "react";
import { Layout, Menu } from "antd";
import { ComumHomeBlue } from "../../Icons";
import "./Header.css";
import { useLocation, useNavigate } from "react-router";
import menuItems from "./headerItem";

const { Header } = Layout;

const DesktopHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
              selectedKeys={[location.pathname]}
              items={menuItems}
              onClick={({ key }) => {
                navigate(key);
              }}
            />
          </div>
        </div>
        {/* <div className="utilities-container header-container">
            <div
              className="coffee"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/coffee")}
            >
              Comum Coffee
            </div>
            <div className="vertical-divider" />
            <div className="utilities">
              <SearchBlack />
              <AccountBlack />
              <CartBlack />
            </div>
          </div> */}
      </Header>
    </>
  );
};

export default DesktopHeader;
