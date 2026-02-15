const Button = ({
  children,
  icon,
  variant = "primary",
  onClick,
  className,
  type = "button",
  disabled = false,
}) => {
  const variants = {
    primary:
      "bg-emerald-600 dark:bg-primary text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 shadow-lg hover:shadow-md border border-border",
    secondary: "text-muted-foreground hover:text-primary hover:bg-muted",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${className} rounded-xs font-semibold text-sm duration-200 cursor-pointer active:scale-95 flex items-center gap-2 transition-all transform hover:-translate-y-0.5`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
