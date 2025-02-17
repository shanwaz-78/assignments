import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext.tsx";

const PrivateRoute: React.FC = () => {
  const { state } = useUserContext();
  const isAuthenticated = !!state.users.length;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  return <Outlet />;
};

export default PrivateRoute;
