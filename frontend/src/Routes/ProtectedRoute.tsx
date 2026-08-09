import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../State/Store";

type Role = "USER" | "SELLER" | "ADMIN";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps) => {

  const {
    isLoggedIn,
    role,
  } = useAppSelector((state) => state.auth);

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (!role || !allowedRoles.includes(role as Role)) {

    if (role === "SELLER") {
      return <Navigate to="/seller" replace />;
    }

     if (role === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;