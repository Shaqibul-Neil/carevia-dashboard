import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ setParams, totalPages, currentPage }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className={`w-10 h-10 rounded-xs text-sm font-bold transition-all flex items-center justify-center 
            ${
              currentPage <= 1
                ? "text-muted-foreground/50 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/50 border border-border"
            }`}
        onClick={() => setParams((prev) => ({ ...prev, page: prev.page - 1 }))}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm font-medium text-muted-foreground px-2">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`w-10 h-10 rounded-xs text-sm font-bold transition-all flex items-center justify-center 
            ${
              currentPage >= totalPages
                ? "text-muted-foreground/50 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/50 border border-border"
            }`}
        onClick={() => setParams((prev) => ({ ...prev, page: prev.page + 1 }))}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
