import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = () => {
  const user = new Cookies().get("user");

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute