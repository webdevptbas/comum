import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value.trim()) return;
    onSearch(value);
  };

  return (
    <div className="search-container search-container-mobile">
      <Input
        placeholder="Search product..."
        prefix={<SearchOutlined />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
