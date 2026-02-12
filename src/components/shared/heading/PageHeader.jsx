const PageHeader = ({ title, icon: Icon, subText }) => {
  const titleArray = title?.split(" ");
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
        {titleArray[0]}
        <span className="text-emerald-600 dark:text-emerald-400">
          {titleArray.slice(1)}
        </span>
        {Icon && (
          <Icon className="text-muted-foreground/20 dark:text-muted-foreground/10 mt-1" />
        )}
      </h1>
      <p className="text-sm text-muted-foreground mt-2 font-medium max-w-lg">
        {subText}
      </p>
    </div>
  );
};

export default PageHeader;
