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
          className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xs transition-all duration-300
       text-foreground font-medium 
       ${isActive ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300" : ""}
       hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 w-full py-2.5 px-3
          }`}
        >
          {Icon && (
            <Icon
              className={`size-5 shrink-0 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}
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
