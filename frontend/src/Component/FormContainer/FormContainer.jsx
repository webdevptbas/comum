import React from "react";
import "./FormContainer.css";

const FormContainer = ({ children, style, className }) => {
  return (
    <div className={`form-container ${className}`} style={style}>
      <div className="form-card">{children}</div>
    </div>
  );
};

export default FormContainer;
