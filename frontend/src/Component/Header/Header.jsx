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
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default MainHeader;
