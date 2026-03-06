import React, { useState } from "react";
import { Drawer, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { ComumHomeBlue } from "../../Icons";
import MobileMenuOverlay from "./MobileMenuOverlay";
import "./Header.css";
import { useNavigate } from "react-router";

const { Header } = Layout;

const MobileHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

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
        <div style={{ width: 24 }} /> {/* Placeholder for right side */}
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
    </>
  );
};

export default MobileHeader;
