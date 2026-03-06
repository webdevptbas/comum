import React from "react";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import ProductFilter from "./ProductFilter";
import "./StoreLayout.css";

const StoreLayout = ({
  title = "Explore Products",
  subtitle = "",
  children,
  onOpenFilter,
}) => {
  return (
    <div className="store-container">
      {/* Header Section */}
      <h3 className="sidebar-heading heading3">{title}</h3>
      {subtitle && <p className="store-subtitle">{subtitle}</p>}

      {/* Mobile Filter Button */}
      <div className="filter-button-mobile">
        <Button icon={<FilterOutlined />} onClick={onOpenFilter}>
          Filter
        </Button>
      </div>

      <div className="store-container-body">
        {/* Desktop Sidebar */}
        <aside className="desktop-only">
          <ProductFilter />
        </aside>

        {/* Main Content */}
        <main className="store-main">{children}</main>
      </div>
    </div>
  );
};

export default StoreLayout;
