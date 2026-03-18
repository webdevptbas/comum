import React, { useState } from "react";
import "./Shop.css";
import { ProductCard } from "../../Component/Card/Card";
import { Link } from "react-router";
import ProductFilter from "./ProductFilter";
import { Modal, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useGetProductsQuery } from "../../Slices/productsApiSlice";

const ShopPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div className="store-container">
      <h3 className="sidebar-heading heading3">Explore Product</h3>

      {/* Mobile Filter Button */}
      <div className="filter-button-mobile">
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filter
        </Button>
      </div>

      <div className="store-container-body">
        {/* Desktop Sidebar */}
        <aside className="desktop-only">
          <ProductFilter />
        </aside>

        <main className="store-main">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <div>{error?.data?.message || error.error}</div>
          ) : (
            <>
              <div className="store-header">
                <p>{`${products.length} Product(s) Available`}</p>
                {/* Optional Sort */}
                {/* <select>
              <option value="relevant">Most Relevant</option>
              <option value="price-low">Lowest Price</option>
              <option value="price-high">Highest Price</option>
            </select> */}
              </div>
              <div className="product-grid">
                {products?.map((product) => (
                  <Link
                    className="product-link"
                    to={`/shop/${product?.brand?.name?.toLowerCase()}/${product?._id}`}
                    key={product._id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ProductCard
                      key={product._id}
                      title={product.productName}
                      brand={product.brand?.name}
                      src={product.imageUrl?.[0]}
                      price={product.displayPrice}
                      finalPrice={product.displayDiscountPrice}
                      type={product.displayIsDiscount ? "discount" : ""}
                      text={
                        product.displayIsDiscount
                          ? `${product.displayDiscount}%`
                          : ""
                      }
                      isDiscount={product.displayIsDiscount}
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Mobile Modal Filter */}
      <Modal
        title="Filter"
        open={isFilterModalOpen}
        onCancel={() => setIsFilterModalOpen(false)}
        footer={null}
        width="90%"
        centered
        // bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <ProductFilter />
      </Modal>
    </div>
  );
};

export default ShopPage;
