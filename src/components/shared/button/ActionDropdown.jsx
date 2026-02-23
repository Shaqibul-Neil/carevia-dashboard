/* src/components/shared/menu/ActionDropdown.jsx */
import { EllipsisVertical } from "lucide-react";

const ActionDropdown = ({ actions }) => {
  return (
    <div className="inline-flex items-center text-xs font-semibold -mr-2 cursor-pointer hover:text-muted-foreground text-emerald-600 dark:text-emerald-400 dropdown dropdown-end z-50">
      <div
        tabIndex={0}
        role="button"
        className="p-2 hover:bg-muted rounded-full transition-all cursor-pointer text-emerald-600 dark:text-emerald-400"
      >
        <EllipsisVertical size={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-card border border-border rounded-xs z-55 mt-2 w-60 p-2 shadow-xl"
      >
        {actions.map((action, index) => (
          <li key={index}>
            <button
              onClick={action.onClick}
              className={`w-full text-left px-3 py-2.5 hover:bg-primary hover:text-white rounded-xs transition-all flex items-center gap-3 text-sm duration-300 ${
                action.variant === "danger"
                  ? "text-red-500 hover:bg-red-500"
                  : "text-foreground"
              }`}
            >
              {action.icon && <action.icon size={16} />}
              <span>{action.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionDropdown;
