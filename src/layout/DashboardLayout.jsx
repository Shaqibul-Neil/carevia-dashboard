import { Outlet } from "react-router";

const DashboardLayout = () => {
  return <div>
    <p>Sidebar</p>
    <Outlet/>
  </div>;
};

export default DashboardLayout;
