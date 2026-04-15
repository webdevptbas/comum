import React, { useState } from "react";
import { Drawer, Layout } from "antd";
import MobileMenuOverlay from "../Mobile/MobileMenuOverlay";
import "../Header.css";
import MobileTopBar from "./MobileTopBar";
import CartDrawer from "../Cart/CartDrawer";

const { Header } = Layout;

const MobileHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const openCart = () => setIsCartVisible(true);
  const closeCart = () => setIsCartVisible(false);

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
        <MobileTopBar
          onMenuOpen={() => setDrawerVisible(true)}
          onCartOpen={openCart}
        />
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

      <CartDrawer open={isCartVisible} onClose={closeCart} />
    </>
  );
};

export default MobileHeader;
