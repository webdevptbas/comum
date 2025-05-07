// src/pages/ErrorPage.jsx

import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <p
        onClick={() => navigate("/")}
        style={{
          fontStyle: "italic",
          textDecoration: "underline",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Return Back Home
      </p>
    </div>
  );
};

export default ErrorPage;
