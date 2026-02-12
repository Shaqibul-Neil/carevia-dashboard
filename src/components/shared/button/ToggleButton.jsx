import React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  // Switch styles
  const switchBg = isLight
    ? "bg-green-200 border-green-300 dark:bg-slate-700 dark:border-slate-600"
    : "bg-slate-600 border-slate-200";
  const switchIcon = isLight ? (
    <Sun className="size-3 text-emerald-800" />
  ) : (
    <Moon className="size-3 text-slate-800" />
  );
  const translateX = isLight ? "translate-x-0" : "translate-x-5";

  return (
    <button
      className="w-full text-left px-3 py-2 hover:bg-foreground hover:text-background  rounded-xs transition-all flex items-center justify-between text-sm cursor-pointer duration-500"
      onClick={toggleTheme}
    >
      {/* Left side: icon + label */}
      <div className="flex items-center gap-3">
        {isLight ? (
          <Sun className="size-4 text-emerald-800" />
        ) : (
          <Moon className="size-4 text-slate-800" />
        )}
        <span>{isLight ? "Light Mode" : "Dark Mode"}</span>
      </div>

      {/* Right side: toggle switch */}
      <div
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${switchBg} cursor-pointer`}
      >
        <span
          className={`pointer-events-none flex items-center justify-center size-5 rounded-full shadow-md ring-0 transition-transform ${translateX} bg-white`}
        >
          {switchIcon}
        </span>
      </div>
    </button>
  );
};

export default ToggleButton;
