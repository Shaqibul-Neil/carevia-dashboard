import {
  Home,
  Users,
  Calendar,
  FileText,
  Search,
  Bell,
  LayoutDashboard,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ToggleLeft,
  Sun,
} from "lucide-react";
import ToggleButton from "./ToggleButton";
import { Link } from "react-router";

const Navbar = () => {
  // Navigation links for left side (only visible on lg screens)
  const navLinks = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Patients", icon: Users, path: "/patients" },
    { name: "Appointments", icon: Calendar, path: "/appointments" },
    { name: "Reports", icon: FileText, path: "/reports" },
  ];
  const dropdownLinks = [
    { name: "My Profile", icon: User, path: "/my-profile" },
    { name: "My Account", icon: Settings, path: "/my-account" },
    { name: "Help & Support", icon: HelpCircle, path: "/help-support" },
  ];

  return (
    <nav className="navbar w-full bg-card border-b border-border px-4">
      <div className="flex-1 flex items-center justify-between">
        {/* Left side - Hamburger (sm/md) + Navigation Links (lg only) */}
        <div className="flex items-center gap-2">
          {/* Hamburger button - visible only on sm/md screens */}
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>

          {/* Navigation Links - visible only on lg screens */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="btn btn-ghost btn-sm flex items-center gap-2 rounded-xs"
              >
                <link.icon className="size-4" />
                <span>{link.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Action Icons + User Dropdown */}
        <div className="flex items-center gap-2">
          {/* Action Icons */}
          <div className="flex items-center gap-1">
            {/* Search Icon */}
            <button className="btn btn-ghost btn-circle btn-sm">
              <Search className="size-5" />
            </button>

            {/* Bell Icon */}
            <button className="btn btn-ghost btn-circle btn-sm">
              <Bell className="size-5" />
            </button>

            {/* Layout Dashboard Icon */}
            <button className="btn btn-ghost btn-circle btn-sm">
              <LayoutDashboard className="size-5" />
            </button>
          </div>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-emerald-50 dark:bg-slate-400 rounded-box z-50 mt-3 w-60 p-3 shadow-lg"
            >
              {/* User Info Section */}
              <div className="pb-3 border-b border-gray-300 mb-2">
                <div className="flex items-center gap-3">
                  {/* Avatar Image */}
                  <div className="w-12 h-12 border-2 border-gray-300 rounded-full overflow-hidden shrink-0">
                    <img
                      alt="User Avatar"
                      referrerPolicy="no-referrer"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Name & Email */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-foreground font-semibold truncate">
                      John Doe
                    </h2>
                    <p className="text-xs text-foreground truncate">
                      john.doe@example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Links */}
              <div className="pb-3 border-b border-gray-300 mb-2">
                {dropdownLinks.map((link) => (
                  <li key={link.name}>
                    <Link className="w-full text-left px-3 py-2 hover:bg-foreground hover:text-background rounded-xs transition-all flex items-center gap-3 text-sm duration-500">
                      <link.icon className="size-4" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <div className="pb-2 border-b border-gray-300 mb-2">
                <ToggleButton />
              </div>

              {/* Logout */}
              <li>
                <button className="w-full text-left px-3 py-2 hover:bg-base-200 rounded-xs transition-all duration-200 flex items-center gap-3 text-sm text-error">
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
