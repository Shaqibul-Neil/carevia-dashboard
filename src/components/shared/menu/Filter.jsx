import {
  ArrowUpDown,
  ChevronDown,
  LayoutGrid,
  Search,
  TableOfContents,
} from "lucide-react";

const Filter = ({ params, setParams, layout }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value, page: 1 })); // Reset page to 0 whenever filters change
  };

  const { tableLayout, setTableLayout, setCardLayout, cardLayout } = layout;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-3 rounded-xs bg-muted/50 dark:bg-muted/20">
      {/* Search - takes 3 columns on desktop */}
      <div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            value={params.search}
            name="search"
            onChange={(e) => handleChange(e)}
            placeholder="Search by tracking ID, customer, email, or service..."
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border rounded-xs text-xs md:text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all"
          />
        </div>
      </div>

      {/* Filters - 1 column container with 2 selects */}
      <div className="flex items-center md:gap-3 justify-between">
        <div className="flex md:flex-row flex-col gap-3 md:items-center">
          {/* Sort Filter */}
          <div className="relative w-1/3">
            <ArrowUpDown
              className="absolute left-3 top-1/2 -translate-y-1/3 text-muted-foreground pointer-events-none"
              size={16}
            />

            <select
              className="appearance-none w-full md:w-47 lg:w-full rounded-xs pl-10 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border  text-foreground shadow-sm text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all cursor-pointer"
              name="sortby"
              value={params.sortby}
              onChange={(e) => handleChange(e)}
            >
              <option value={"all"}>Sort By</option>
              <option value="createdAt-desc">Date (Newest First)</option>
              <option value="createdAt-asc">Date (Oldest First)</option>

              <option value="totalPrice-desc">Total (High to Low)</option>
              <option value="totalPrice-asc">Total (Low to High)</option>

              <option value="amountPaid-desc">Paid (High to Low)</option>
              <option value="amountPaid-asc">Paid (Low to High)</option>

              <option value="dueAmount-desc">Due (High to Low)</option>
              <option value="dueAmount-asc">Due (Low to High)</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <ChevronDown className=" text-muted-foreground" size={16} />
            </div>
          </div>
          <div className="flex gap-3 w-2/3">
            {/* Status Filter */}
            <select
              className="px-4 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border rounded-xs text-xs md:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all cursor-pointer md:w-47 lg:w-1/2 w-1/2"
              name="status"
              value={params.status}
              onChange={(e) => handleChange(e)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="due">Due</option>
            </select>
            {/* Payment Method Filter */}
            <select
              className="px-4 py-2.5 bg-muted/50 dark:bg-muted/20 border border-border rounded-xs text-xs md:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-400 transition-all cursor-pointer md:w-47 lg:w-1/2 w-1/2"
              name="method"
              value={params.method}
              onChange={(e) => handleChange(e)}
            >
              <option value="all">All Methods</option>
              <option value="card">Card</option>
              <option value="cash">Cash</option>
            </select>{" "}
          </div>
        </div>
        {/* Layout change button */}
        <div className="hidden md:flex gap-3">
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
            <TableOfContents />
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
            <LayoutGrid />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
