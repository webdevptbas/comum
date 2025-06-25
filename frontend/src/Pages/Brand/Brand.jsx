import React from "react";
import { brands } from "../Home/item";
import "./Brand.css";

const BrandPage = () => {
  return (
    <>
      <div className="brand-detail-title heading2">Our Partner Brands</div>
      <div className="brand-page-container">
        {brands.map((brand, index) => (
          <div className="brand-page-card">
            {brand.igUrl ? (
              <a
                href={brand.igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-link"
              >
                <img
                  className="brand-page-item"
                  src={brand.src}
                  alt={brand.alt}
                  key={index}
                />
              </a>
            ) : (
              <img
                className="brand-page-item"
                src={brand.src}
                alt={brand.alt}
                key={index}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BrandPage;
