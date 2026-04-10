import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import menuItems from "../headerItem";
import { ComumHomeBlue } from "../../../Icons";

const DesktopMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
  );
};

export default DesktopMenu;
