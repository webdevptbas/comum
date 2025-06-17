import React from "react";
import { Input } from "antd";
import { RightOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import "./MobileMenuOverlay.css";

const { Search } = Input;

const MobileMenuOverlay = ({ closeMenu }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-header">
        <CloseOutlined onClick={closeMenu} />
      </div>
      {/* <div className="menu-search">
        <Search placeholder="Search a Product" />
      </div>
      <div className="menu-group" onClick={() => handleNavigate("/shop")}>
        Shop <RightOutlined />
      </div>
      <div className="menu-group" onClick={() => handleNavigate("/brand")}>
        Brand <RightOutlined />
      </div> */}
      <div
        className="mobile-menu-item"
        onClick={() => handleNavigate("/community")}
      >
        Community
      </div>
      <div
        className="mobile-menu-item"
        onClick={() => handleNavigate("/coffee")}
      >
        Comum Coffee
      </div>
      <div
        className="mobile-menu-item"
        onClick={() => handleNavigate("/service")}
      >
        Service
      </div>
      {/* <hr /> */}
      {/* <div className="menu-footer" onClick={() => handleNavigate("/coffee")}>
        <span role="img" aria-label="coffee">
          ☕
        </span>{" "}
        Comum Coffee
      </div> */}
    </div>
  );
};

export default MobileMenuOverlay;
