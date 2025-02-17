import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext.tsx";

const PublicRoute: React.FC = () => {
  const { state } = useUserContext();
  const isAuthenticated = !!state.users.length;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
