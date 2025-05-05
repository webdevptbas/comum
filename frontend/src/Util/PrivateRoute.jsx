// src/Routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext"; // Update with your actual context path

const PrivateRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace state={{ error: "Unauthorized" }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
