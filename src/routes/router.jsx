import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home";
import Analytics from "../pages/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
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
]);
export default router;
