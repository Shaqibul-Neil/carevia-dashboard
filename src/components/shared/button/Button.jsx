const Button = ({ children, icon, variant = "primary", onClick }) => {
  const variants = {
    primary:
      "px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600",
    secondary:
      "px-4 py-3 bg-muted/50 dark:bg-muted/20 text-foreground hover:bg-muted dark:hover:bg-muted/30",
  };

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} rounded-xs font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 border border-border`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
