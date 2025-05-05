import React from "react";
import "./Tag.css";

const Tag = ({ type, text }) => {
  return <div className={`tag-container tag-${type}`}>{text}</div>;
};

export default Tag;
