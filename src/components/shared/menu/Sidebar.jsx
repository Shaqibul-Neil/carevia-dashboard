import {
  Home,
  Calendar,
  CreditCard,
  Users,
  BookOpen,
  Wallet,
  MessageSquare,
} from "lucide-react";
import { GiHeartInside } from "react-icons/gi";
import useAuth from "../../../hooks/useAuth";
import SidebarLinks from "./SidebarLinks";
import { Link } from "react-router";

const Sidebar = () => {
  const { hasRole } = useAuth();

  // Admin Menu
  const adminMenu = [
    {
      name: "User Management",
      path: "/admin/user-management",
      icon: Users,
    },
  ];

  // User Menu
  const userMenu = [];

  // Common Menu for all users
  const commonMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: hasRole("admin") ? "All Bookings" : "My Booking",
      path: hasRole("admin") ? "/admin/all-bookings" : "/user/my-booking",
      icon: Calendar,
    },
    {
      name: hasRole("admin") ? "Payments History" : "My Payments History",
      path: hasRole("admin")
        ? "/admin/payments-history"
        : "/user/my-payments-history",
      icon: CreditCard,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 border-b border-emerald-100 dark:border-emerald-900/30 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
        {/* Sidebar Header - Logo + Toggle Button */}
        <div className="flex w-full items-center justify-between px-4 h-16 border-b border-emerald-200 dark:border-emerald-800">
          {/* Logo - visible only when drawer is open */}
          <div className="is-drawer-close:hidden">
            <Link href={"/"} className="flex items-center">
              <span className="font-black text-2xl tracking-tighter hover:scale-105 transition-all duration-500 transform-gpu will-change-transform flex items-center bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                <span>Carev</span>
                <GiHeartInside className="w-6 h-6 shrink-0 text-emerald-600 dark:text-teal-400" />
                <span className="-ml-1">a</span>
              </span>
            </Link>
          </div>

          {/* Toggle Button */}
          <label
            htmlFor="my-drawer-4"
            aria-label="toggle sidebar"
            className="btn btn-square btn-ghost btn-sm"
          >
            {/* Sidebar panel/close icon - visible on all screens */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-5 text-foreground"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="menu w-full grow px-1.5 py-2 space-y-0.5 z-25">
          {/* Common Menu */}
          {commonMenu.map((item) => (
            <li key={item.path}>
              <SidebarLinks to={item.path} icon={item.icon} label={item.name} />
            </li>
          ))}

          {/* Admin Menu - Only visible for admin role */}
          {hasRole("admin") && (
            <>
              {adminMenu.map((item) => (
                <li key={item.path}>
                  <SidebarLinks
                    to={item.path}
                    icon={item.icon}
                    label={item.name}
                  />
                </li>
              ))}
            </>
          )}

          {/* User Menu - Only visible for user role */}
          {hasRole("user") && (
            <>
              {userMenu.map((item) => (
                <li key={item.path}>
                  <SidebarLinks
                    to={item.path}
                    icon={item.icon}
                    label={item.name}
                  />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
