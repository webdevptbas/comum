import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext"; // Adjust this import path accordingly

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace state={{ error: "Unauthorized" }} />;
  }

  // If children are passed (i.e., wrapping a page), render them
  if (children) {
    return children;
  }

  // Otherwise render Outlet (for layout routes)
  return <Outlet />;
};

export default PrivateRoute;
