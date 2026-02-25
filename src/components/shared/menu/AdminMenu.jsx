import {
  Home,
  Calendar,
  CreditCard,
  Users,
  MessageSquare,
  ChevronDown,
  UserCheck,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import SidebarLinks from "./SidebarLinks";

const AdminMenu = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  //sidebar toggle
  const handleAllUsersClick = () => {
    const drawer = document.getElementById("my-drawer-4");
    //check if drawer is open or not
    if (drawer && !drawer.checked) {
      drawer.checked = true;
    }
    //dropdown menu
    setIsUsersOpen(!isUsersOpen);
  };

  return (
    <>
      {/* Dashboard */}
      <li>
        <SidebarLinks to="/" icon={Home} label="Dashboard" />
      </li>

      {/* All Users with Submenu */}
      <li className="flex flex-col">
        <button
          onClick={handleAllUsersClick}
          className={`flex items-center justify-between gap-3 w-full py-2.5 px-3 rounded-xs transition-all duration-500 font-medium text-foreground hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 group`}
        >
          <div className="flex items-center gap-3">
            <UserCircle className="size-5 shrink-0 text-muted-foreground group-hover:text-emerald-600" />
            <span className="is-drawer-close:hidden">All Users</span>
          </div>
          <ChevronDown
            className={`size-4 transition-transform duration-300 is-drawer-close:hidden ${isUsersOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Submenu Items */}
        {isUsersOpen && (
          <ul className="ml-6 mt-1 space-y-1 transition-all duration-300 is-drawer-close:hidden">
            <li>
              <SidebarLinks
                to="/admin/user-management"
                icon={Users}
                label="Users Management"
              />
            </li>
            <li>
              <SidebarLinks
                to="/admin/caregiver-management"
                icon={UserCheck}
                label="Caregiver Management"
              />
            </li>
          </ul>
        )}
      </li>

      {/* All Bookings */}
      <li>
        <SidebarLinks
          to="/admin/all-bookings"
          icon={Calendar}
          label="All Bookings"
        />
      </li>

      {/* Payments History */}
      <li>
        <SidebarLinks
          to="/admin/payments-history"
          icon={CreditCard}
          label="Payments History"
        />
      </li>

      {/* Chat */}
      <li>
        <SidebarLinks to="/chat" icon={MessageSquare} label="Chat" />
      </li>
    </>
  );
};

export default AdminMenu;
