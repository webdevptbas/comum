import React from "react";
import "./Header.css";
import "../../index.css";
import useMediaQuery from "../../Util/useMediaQuery";
import MobileHeader from "./Mobile/MobileHeader";
import DesktopHeader from "./Desktop/DesktopHeader";

const MainHeader = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default MainHeader;
