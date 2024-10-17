import React from "react";
import { Navigate } from "react-router-dom";

// Cek apakah token ada, ini bisa diubah sesuai logika auth-mu
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token; // return true jika token ada, false jika tidak
};

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
