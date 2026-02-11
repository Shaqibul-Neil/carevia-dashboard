import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/Loading";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  //if token available
  return children;
};

export default PrivateRoute;
