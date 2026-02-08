import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/dashboard/Home";
import Analytics from "../pages/dashboard/Analytics";
import Login from "../pages/auth/login";
import AuthLayout from "../layout/AuthLayout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
