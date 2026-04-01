import React, { useEffect, useState } from "react";
import "./ProductFilter.css";
import { fetchBrands, fetchCategories } from "../../Util/apiService";

const ProductFilter = ({ onChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    gender: "",
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const LIMIT = 5;

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, LIMIT);

  const visibleBrands = showAllBrands ? brands : brands.slice(0, LIMIT);

  const handleSelect = (type, value) => {
    const updated = {
      ...filters,
      [type]: filters[type] === value ? "" : value, // toggle
    };

    setFilters(updated);
    onChange(updated);
  };

  const handleGenderSelect = (value) => {
    let isSame = false;
    let newValue;

    if (value === "Unisex") {
      // check if already Unisex
      isSame =
        Array.isArray(filters.gender) &&
        filters.gender.includes("Men") &&
        filters.gender.includes("Women");

      newValue = isSame ? "" : ["Men", "Women"];
    } else {
      isSame = filters.gender === value;
      newValue = isSame ? "" : value;
    }

    const updated = {
      ...filters,
      gender: newValue,
    };

    setFilters(updated);
    onChange(updated);
  };

  useEffect(() => {
    const loadData = async () => {
      const brandRes = await fetchBrands();
      const categoryRes = await fetchCategories();

      setBrands(brandRes.sort((a, b) => a.name.localeCompare(b.name)));

      setCategories(categoryRes.sort((a, b) => a.name.localeCompare(b.name)));
    };

    loadData();
  }, []);

  return (
    <div className="store-sidebar">
      {/* Category Filter */}
      <div className="filter-group">
        <h5 className="heading5">Product Category</h5>

        {visibleCategories.map((cat) => (
          <label key={cat._id}>
            <input
              type="checkbox"
              checked={filters.category === cat._id}
              onChange={() => handleSelect("category", cat._id)}
            />
            {cat.name}
          </label>
        ))}

        {categories.length > LIMIT && (
          <button
            className="show-more-btn button"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div className="filter-group">
        <h5 className="heading5">Brands</h5>

        {visibleBrands.map((brand) => (
          <label key={brand._id}>
            <input
              type="checkbox"
              checked={filters.brand === brand._id}
              onChange={() => handleSelect("brand", brand._id)}
            />
            {brand.name}
          </label>
        ))}

        {brands.length > LIMIT && (
          <button
            className="show-more-btn button"
            onClick={() => setShowAllBrands(!showAllBrands)}
          >
            {showAllBrands ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Gender Filter */}
      <div className="filter-group">
        <h5 className="heading5">Gender</h5>
        <label>
          <input
            type="checkbox"
            checked={filters.gender === "Men"}
            onChange={() => handleGenderSelect("Men")}
          />
          Men
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.gender === "Women"}
            onChange={() => handleGenderSelect("Women")}
          />
          Women
        </label>

        <label>
          <input
            type="checkbox"
            checked={
              Array.isArray(filters.gender) &&
              filters.gender.includes("Men") &&
              filters.gender.includes("Women")
            }
            onChange={() => handleGenderSelect("Unisex")}
          />
          Unisex
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
