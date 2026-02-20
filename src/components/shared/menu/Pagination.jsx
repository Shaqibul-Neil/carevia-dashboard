import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ setParams, totalPages, currentPage }) => {
  return (
    <div className="flex items-center justify-center gap-2 pb-4">
      <button
        className={`w-10 h-10 rounded-xs text-sm font-bold transition-all flex items-center justify-center cursor-pointer duration-500 
            ${
              currentPage <= 1
                ? "text-muted-foreground/50 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground border border-border hover:bg-primary"
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
        className={`w-10 h-10 rounded-xs text-sm font-bold transition-all flex items-center justify-center cursor-pointer duration-500
            ${
              currentPage >= totalPages
                ? "text-muted-foreground/50 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:bg-primary border border-border"
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
