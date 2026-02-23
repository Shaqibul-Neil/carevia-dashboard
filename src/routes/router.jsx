import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/dashboard/Home";
import Analytics from "../pages/dashboard/Analytics";

import AuthLayout from "../layout/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

//Common Pages

import Chat from "../pages/dashboard/Chat";
import Login from "../pages/auth/Login";
import AllBookings from "../pages/dashboard/common/AllBookings";

// Admin Pages
import UserManagement from "../pages/dashboard/admin/UserManagemant";

// User Pages

// Error Pages
import NotFound from "../components/shared/others/NotFound";
import Unauthorized from "../components/shared/others/Unauthorized";
import PaymentsHistory from "../pages/dashboard/common/PaymentsHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      // Admin Routes
      {
        path: "admin/all-bookings",
        element: (
          <AdminRoute>
            <AllBookings />
          </AdminRoute>
        ),
      },
      {
        path: "admin/payments-history",
        element: (
          <AdminRoute>
            <PaymentsHistory />
          </AdminRoute>
        ),
      },
      {
        path: "admin/user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      // User Routes
      {
        path: "user/my-booking",
        element: (
          <UserRoute>
            <AllBookings />
          </UserRoute>
        ),
      },
      {
        path: "user/my-payments-history",
        element: (
          <UserRoute>
            <PaymentsHistory />
          </UserRoute>
        ),
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
  // Unauthorized Route
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
export default router;
