import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

import { useEffect } from "react";
import Navbar from "../components/shared/menu/Navbar";
import Sidebar from "../components/shared/menu/Sidebar";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  // Open drawer by default on large screens
  useEffect(() => {
    const drawer = document.getElementById("my-drawer-4");
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

    if (drawer && isLargeScreen) {
      drawer.checked = true;
    }
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-background">
        {/* Navbar */}
        <Navbar />

        {/* Page content here */}
        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
      {/* Chat icon */}
    </div>
  );
};

export default DashboardLayout;
