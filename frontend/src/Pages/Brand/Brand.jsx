import React from "react";
import { brands } from "../Home/item";
import "./Brand.css";

const BrandPage = () => {
  return (
    <>
      <div
        className="brand-title title"
        style={{ color: "#0A0A0A", padding: "100px 0 0 0" }}
      >
        Our Partner Brands
      </div>
      <div className="brand-page-container">
        {brands.map((brand, index) => (
          <div className="brand-page-card">
            <img
              className="brand-page-item"
              src={brand.src}
              alt={brand.alt}
              key={index}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BrandPage;
