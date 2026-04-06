import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { Modal, Button } from "antd";
import { FilterOutlined, LeftOutlined } from "@ant-design/icons";
import "../../Pages/Shop/Shop.css";
import ProductFilter from "../../Pages/Shop/ProductFilter";
import { fetchBrands } from "../../Util/apiService";

const ShopLayout = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [brandName, setBrandName] = useState("");

  const navigate = useNavigate();
  const { brand } = useParams();
  const hideBrandFilter = !!brand;

  const handleFilterChange = (filters) => {
    const newParams = new URLSearchParams();

    if (filters.gender) {
      newParams.set(
        "gender",
        Array.isArray(filters.gender)
          ? filters.gender.join(",")
          : filters.gender,
      );
    }

    if (!hideBrandFilter && filters.brand) {
      newParams.set("brand", filters.brand);
    }

    if (filters.category) {
      newParams.set("category", filters.category);
    }

    // 👇 IMPORTANT: route differs based on page
    if (brand) {
      navigate(`/shop/${brand}?${newParams.toString()}`);
    } else {
      navigate(`/shop?${newParams.toString()}`);
    }
  };

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchBrands();

        if (brand) {
          const found = data.find(
            (b) => b.name.toLowerCase() === brand.toLowerCase(),
          );
          setBrandName(found?.name || "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadBrands();
  }, [brand]);

  return (
    <div className="store-container">
      <div className="shop-header">
        {brand && (
          <div
            className="back-button"
            onClick={() => navigate("/shop")}
            style={{ cursor: "pointer", marginBottom: "0.5rem" }}
          >
            <LeftOutlined /> Back to Shop
          </div>
        )}

        <h3 className="sidebar-heading heading3">
          {brand ? `Explore ${brandName || brand} Product` : "Explore Product"}
        </h3>
      </div>

      {/* Mobile Filter */}
      <div className="filter-button-mobile">
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filter
        </Button>
      </div>

      <div className="store-container-body">
        {/* Sidebar */}
        <aside className="desktop-only">
          <ProductFilter
            onChange={handleFilterChange}
            hideBrandFilter={hideBrandFilter}
          />
        </aside>

        {/* Page Content */}
        <main className="store-main">
          <Outlet />
        </main>
      </div>

      {/* Mobile Modal */}
      <Modal
        title="Filter"
        open={isFilterModalOpen}
        onCancel={() => setIsFilterModalOpen(false)}
        footer={null}
        width="90%"
        centered
      >
        <ProductFilter
          onChange={handleFilterChange}
          hideBrandFilter={hideBrandFilter}
        />
      </Modal>
    </div>
  );
};

export default ShopLayout;
