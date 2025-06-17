import React from "react";
import { Drawer, Layout, Menu } from "antd";
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
import useMediaQuery from "../../Util/useMediaQuery";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const MainHeader = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <MobileHeader /> : <DesktopHeader />;

  // return (
  //   <>
  //     <Header className="header scrolled">
  //       <div className="main-menu-container header-container">
  //         <div
  //           className="logo-container"
  //           onClick={() => {
  //             navigate("/");
  //           }}
  //         >
  //           <ComumHomeBlue height="31" width="auto" />
  //         </div>
  //         <div className="menu-container">
  //           <Menu
  //             theme="dark"
  //             mode="horizontal"
  //             selectedKeys={[location.pathname]}
  //             items={menuItems}
  //             onClick={({ key }) => {
  //               navigate(key);
  //             }}
  //           />
  //         </div>
  //       </div>
  //       {/* <div className="utilities-container header-container">
  //         <div
  //           className="coffee"
  //           style={{ cursor: "pointer" }}
  //           onClick={() => navigate("/coffee")}
  //         >
  //           Comum Coffee
  //         </div>
  //         <div className="vertical-divider" />
  //         <div className="utilities">
  //           <SearchBlack />
  //           <AccountBlack />
  //           <CartBlack />
  //         </div>
  //       </div> */}
  //     </Header>
  //   </>
  // );
};

export default MainHeader;
