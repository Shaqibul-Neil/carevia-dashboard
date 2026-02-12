import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/dashboard/Home";
import Analytics from "../pages/dashboard/Analytics";
import Login from "../pages/auth/login";
import AuthLayout from "../layout/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

// Admin Pages
import BookingManagement from "../pages/dashboard/admin/BookingManagement";
import PaymentsHistory from "../pages/dashboard/admin/PaymentsHistory";
import UserManagement from "../pages/dashboard/admin/UserManagemant";

// User Pages
import MyBooking from "../pages/dashboard/user/MyBooking";
import MyPaymentsHistory from "../pages/dashboard/user/MyPaymentsHistory";

// Error Pages
import Unauthorized from "../components/shared/Unauthorized";
import NotFound from "../components/shared/NotFound";

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
      // Admin Routes
      {
        path: "admin/booking-management",
        element: (
          <AdminRoute>
            <BookingManagement />
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
            <MyBooking />
          </UserRoute>
        ),
      },
      {
        path: "user/my-payments-history",
        element: (
          <UserRoute>
            <MyPaymentsHistory />
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
