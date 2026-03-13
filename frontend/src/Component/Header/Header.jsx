import React from "react";
import "./Header.css";
import "../../index.css";
import useMediaQuery from "../../Util/useMediaQuery";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const MainHeader = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default MainHeader;
