import React from "react";
import "./Tag.css";
import "../../index.css";

const Tag = ({ type, text }) => {
  return <div className={`tag-container tag-${type} text-s-medium`}>{text}</div>;
};

export default Tag;
