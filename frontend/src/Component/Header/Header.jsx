import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu } from "antd";
import "./Header.css";
import "../../index.css";
import {
  AccountBlack,
  AccountIcon,
  CartBlack,
  CartIcon,
  ComumHome,
  ComumHomeBlue,
  SearchBlack,
  SearchIcon,
} from "../../Icons";
import { useLocation, useNavigate } from "react-router";
import menuItems from "./headerItem";

const { Header } = Layout;

const MainHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Set threshold for when to add the solid background
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

export default MainHeader;
