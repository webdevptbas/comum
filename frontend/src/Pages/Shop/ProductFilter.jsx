import React from "react";
import "./ProductFilter.css"; // Optional if you want to style separately

const ProductFilter = () => {
  return (
    <div className="store-sidebar">
      {/* Category Filter */}
      <div className="filter-group">
        <h5 className="heading5">Product Category</h5>
        <label>
          <input type="checkbox" defaultChecked /> All Category
        </label>
        <label>
          <input type="checkbox" /> Helmet
        </label>
        <label>
          <input type="checkbox" /> Jersey
        </label>
        <label>
          <input type="checkbox" /> Pants
        </label>
        <label>
          <input type="checkbox" /> Bag
        </label>
      </div>

      {/* Brand Filter */}
      <div className="filter-group">
        <h5 className="heading5">Brands</h5>
        <label>
          <input type="checkbox" defaultChecked /> All Brand
        </label>
        <label>
          <input type="checkbox" /> MET
        </label>
        <label>
          <input type="checkbox" /> Castelli
        </label>
        <label>
          <input type="checkbox" /> Shimano
        </label>
      </div>

      {/* Gender Filter */}
      <div className="filter-group">
        <h5 className="heading5">Gender</h5>
        <label>
          <input type="checkbox" /> Men
        </label>
        <label>
          <input type="checkbox" /> Woman
        </label>
        <label>
          <input type="checkbox" defaultChecked /> Unisex
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
