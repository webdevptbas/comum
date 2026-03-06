import React from "react";
import { Drawer } from "antd";

const MobileFilterOverlay = ({ open, onClose }) => {
  return (
    <Drawer
      title="Filter"
      placement="left"
      closable={true}
      onClose={onClose}
      open={open}
      width={300}
      className="mobile-filter-drawer"
    >
      {/* Put your filter form or components here */}
    </Drawer>
  );
};

export default MobileFilterOverlay;
