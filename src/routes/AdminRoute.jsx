import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/shared/Loading";

const AdminRoute = ({ children }) => {
  const { token, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has admin role
  if (!hasRole("admin")) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
