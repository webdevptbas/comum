import React, { useState } from "react";
import { Layout } from "antd";
import "../Header.css";
import "../../../index.css";
import DesktopMenu from "./DesktopMenu.jsx";
import DesktopUtilities from "./DesktopUtilities.jsx";
import CartDrawer from "../Cart/CartDrawer.jsx";

const { Header } = Layout;

const DesktopHeader = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <>
      <Header
        className="header scrolled"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <DesktopMenu />
        <DesktopUtilities onCartOpen={() => setIsCartVisible(true)} />
        <CartDrawer
          open={isCartVisible}
          onClose={() => setIsCartVisible(false)}
        />
      </Header>
    </>
  );
};

export default DesktopHeader;
