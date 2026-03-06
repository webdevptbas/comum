import React from "react";
import { Input } from "antd";
import {
  RightOutlined,
  CloseOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { MdSportsTennis } from "react-icons/md";
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
        className="mobile-menu-item text-menu"
        onClick={() => handleNavigate("/shop")}
      >
        Shop
      </div>
      <div
        className="mobile-menu-item text-menu"
        onClick={() => handleNavigate("/brands")}
      >
        Brands
      </div>
      <div
        className="mobile-menu-item text-menu"
        onClick={() => handleNavigate("/service")}
      >
        Service
      </div>
      <div
        className="mobile-menu-item text-menu"
        onClick={() => handleNavigate("/community")}
      >
        Community
      </div>
      <div
        className="mobile-menu-item text-menu"
        onClick={() => handleNavigate("/coffee")}
        style={{ display: "flex", gap: "20px" }}
      >
        <CoffeeOutlined />
        Comum Coffee
      </div>
      <div
        className="mobile-menu-item text-menu"
        onClick={() => handleNavigate("/simulator")}
        style={{ display: "flex", gap: "20px" }}
      >
        <MdSportsTennis />
        Comum Simulator
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
