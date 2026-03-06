import React from "react";
import { brands } from "../Home/item";
import "./Brand.css";
import { useSearchParams, useNavigate } from "react-router";
import BrandFilter from "./BrandFilter.jsx";

const BrandPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "cycling";

  if (!["cycling", "padel"].includes(type)) {
    navigate("/brands?type=cycling", { replace: true });
    return null;
  }

  const filteredBrands = [...brands].filter((brand) => brand.type === type);
  return (
    <>
      <div className="brand-detail-title heading2">Our Partner Brands</div>

      <BrandFilter activeType={type} />
      <div className="brand-page-container">
        {filteredBrands.map((brand, index) => (
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
