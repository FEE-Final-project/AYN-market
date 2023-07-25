import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = () => {
  const { user } = useAuthContext();
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute