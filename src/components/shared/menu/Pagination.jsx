const Pagination = () => {
  const pages = [1, 2, 3];

  return (
    <div className="flex items-center justify-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-xs text-sm font-bold transition-all flex items-center justify-center ${
            page === 1
              ? "bg-emerald-600 dark:bg-primary text-white shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/50 border border-border"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
