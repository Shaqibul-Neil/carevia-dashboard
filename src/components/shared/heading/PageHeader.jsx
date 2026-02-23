import Button from "../button/Button";

const PageHeader = ({
  title,
  subText,
  icon: TitleIcon,
  buttonText,
  buttonIcon,
  onButtonClick,
}) => {
  const titleArray = title?.split(" ");
  const [first, ...rest] = titleArray;
  return (
    <div className="bg-card dark:bg-card rounded-xs p-6 md:p-8  border border-border relative overflow-hidden group">
      {/* Ambient Background Effect */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 dark:group-hover:bg-emerald-400/10 transition-colors duration-700"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          {/* Title Section */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            {first}
            <span className="text-emerald-600 dark:text-emerald-400">
              {rest.join(" ")}
            </span>
            {TitleIcon && (
              <TitleIcon className="text-muted-foreground/20 dark:text-muted-foreground/10 mt-1" />
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-medium max-w-lg">
            {subText}
          </p>
        </div>
        {buttonText && (
          <Button
            onClick={onButtonClick}
            className={"px-4 py-2.5"}
            icon={buttonIcon}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
