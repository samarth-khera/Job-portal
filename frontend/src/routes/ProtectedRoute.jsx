import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Wait for AuthContext to load
  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If role mismatch → redirect appropriately
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Navigate
        to={user.role === "employer" ? "/employer-dashboard" : "/find-jobs"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
