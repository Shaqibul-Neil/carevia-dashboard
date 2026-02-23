import {
  ArrowUpDown,
  ChevronDown,
  LayoutGrid,
  Search,
  TableOfContents,
} from "lucide-react";

const Filter = ({
  params,
  setParams,
  layout,
  isAdmin,
  sortOptions,
  filterConfigs,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value, page: 1 })); // Reset page to 0 whenever filters change
  };

  const { tableLayout, setTableLayout, setCardLayout, cardLayout } = layout;
  return (
    <div className="p-3 rounded-xs bg-muted/50 dark:bg-muted/20 border border-border/50 space-y-3 xl:space-y-0 xl:flex xl:gap-3 xl:items-center">
      {/* SECTION 1: Search & Main Sort */}
      <div className="flex flex-col md:flex-row gap-3 grow xl:flex-[2.5]">
        <div className="relative grow xl:flex-2">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            value={params.search}
            name="search"
            onChange={(e) => handleChange(e)}
            placeholder={`Search by tracking ID, ${isAdmin && "customer"}, email, or service...`}
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border rounded-xs text-xs md:text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all"
          />
        </div>

        {/*   Main Sort Filter  */}
        <div className="relative w-full md:w-64 xl:w-40">
          <ArrowUpDown
            className="absolute left-3 top-1/2 -translate-y-1/3 text-muted-foreground pointer-events-none"
            size={16}
          />

          <select
            className="appearance-none w-full rounded-xs pl-10 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border  text-foreground shadow-sm text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all cursor-pointer"
            name="sortby"
            value={params.sortby}
            onChange={(e) => handleChange(e)}
          >
            {sortOptions?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <ChevronDown className=" text-muted-foreground" size={16} />
          </div>
        </div>
      </div>

      {/* SECTION 2: Secondary Filters & Layout Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 w-full grow">
          {filterConfigs?.map((config) => (
            <div className="relative min-w-30 md:w-32 grow">
              <select
                className="px-4 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border rounded-xs text-xs md:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all cursor-pointer w-full"
                key={config.name}
                name={config.name}
                value={params[config.name]}
                onChange={(e) => handleChange(e)}
              >
                <option value="all">All {config.label}</option>
                {config.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>{" "}
            </div>
          ))}
        </div>

        {/* Layout change button */}
        <div className="hidden md:flex xl:gap-2 gap-4">
          <button
            className={`p-2 border cursor-pointer ${
              tableLayout
                ? "bg-primary text-background" // active
                : "hover:bg-muted-foreground active:bg-muted-foreground" // inactive
            }`}
            onClick={() => {
              setTableLayout(true);
              setCardLayout(false);
            }}
          >
            <TableOfContents size={20} />
          </button>
          <button
            className={`p-2 border cursor-pointer ${
              cardLayout
                ? "bg-primary text-background" // active
                : "hover:bg-muted-foreground active:bg-muted-foreground" // inactive
            }`}
            onClick={() => {
              setTableLayout(false);
              setCardLayout(true);
            }}
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
