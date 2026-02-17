import { NavLink } from "react-router";

const SidebarLinks = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      end
      data-tip={label}
      className="block w-full p-0 mb-1 rounded-xs"
    >
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xs transition-all duration-500
        font-medium 
       ${isActive ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 text-white" : "text-foreground"}
       hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 w-full py-2.5 px-3
          }`}
        >
          {Icon && (
            <Icon
              className={`size-5 shrink-0 ${isActive ? "text-white" : "text-muted-foreground"}`}
            />
          )}

          <span
            className={`is-drawer-close:hidden ${isActive ? "font-semibold" : ""}`}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLinks;
