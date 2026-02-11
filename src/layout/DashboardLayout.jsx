import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <p>Sidebar</p>
        <div>
          {/* User info display */}
          <span className="mr-4">Welcome, {user?.name || user?.email}</span>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
