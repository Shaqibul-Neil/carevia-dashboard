import { DollarSign, TrendingUp, CreditCard, Clock } from "lucide-react";

const iconMap = {
  "total-price": DollarSign,
  "amount-Paid": TrendingUp,
  "due-amount": Clock,
  transactions: CreditCard,
};
const getChangeColor = (metric) => {
  const isDue = metric._id === "due-amount";
  if (isDue) {
    return metric.changeType === "increase"
      ? "text-rose-500"
      : "text-emerald-500";
  }
  return metric.changeType === "increase"
    ? "text-emerald-500"
    : "text-rose-500";
};

const PaymentMetrics = ({ metricsData }) => {
  if (!metricsData || metricsData.length === 0) return null;

  //color config
  const colorConfig = {
    "total-price": {
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-400",
      dot: "bg-emerald-400",
    },
    "amount-Paid": {
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-500",
      dot: "bg-blue-400",
    },
    "due-amount": {
      gradient: "bg-gradient-to-br from-rose-400 to-red-500",
      dot: "bg-rose-400",
    },
    transactions: {
      gradient: "bg-gradient-to-br from-purple-400 to-violet-500",
      dot: "bg-purple-400",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => {
        const Icon = iconMap[metric._id] || DollarSign;
        const config = colorConfig[metric._id] || colorConfig["total-price"];
        const delay = index * 100;

        return (
          <div
            key={metric._id}
            className="relative group cursor-pointer transform transition-all duration-700 hover:scale-101 hover:-translate-y-3"
            style={{ transitionDelay: `${delay}ms` }}
          >
            {/* Subtle Glow Effect */}
            <div
              className={`absolute -inset-1 ${config.gradient} rounded-xs opacity-5 group-hover:opacity-20 transition-all duration-700`}
            ></div>

            {/* Glass Morphism Card */}
            <div className="relative bg-card/95 backdrop-blur-xl rounded-xs py-2 px-5 overflow-hidden group-hover:shadow-sm transition-all duration-500">
              {/* Floating Background Pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] transform rotate-12 group-hover:rotate-45 transition-transform duration-1000 pointer-events-none">
                <Icon size={120} className="text-foreground" />
              </div>

              {/* Premium Floating Orb */}
              <div
                className={`absolute top-6 right-6 w-10 h-10 ${config.gradient} rounded-xs flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
              >
                <Icon size={18} className="text-white" />
              </div>

              {/* Content Area */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  {/* Side Indicator Line */}
                  {/* <div
                    className={`w-1 h-12 ${config.gradient} rounded-full shadow-lg`}
                  ></div> */}
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] block mb-1">
                      {metric.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 ${config.dot} rounded-full animate-pulse`}
                      ></div>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        Live Update
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-3xl font-black text-foreground tracking-tight leading-none">
                    {metric._id === "transactions"
                      ? metric.value
                      : `$${metric.value}.00`}
                  </div>

                  {/* Change Type Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-bold ${getChangeColor(metric)}`}
                    >
                      {metric.changeType === "increase" ? "↑" : "↓"}{" "}
                      {metric.change}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      vs last month
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMetrics;
