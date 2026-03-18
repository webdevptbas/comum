import React from "react";
import "./FormContainer.css";

const FormContainer = ({ children, style }) => {
  return (
    <div className="form-container" style={style}>
      <div className="form-card">{children}</div>
    </div>
  );
};

export default FormContainer;
