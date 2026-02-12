import { DollarSign, TrendingUp, CreditCard, Clock } from "lucide-react";

const PaymentMetrics = () => {
  const metrics = [
    {
      id: 1,
      label: "Total Revenue",
      value: "$45,280",
      change: "+12.5%",
      changeType: "increase",
      icon: DollarSign,
      color: "emerald",
    },
    {
      id: 2,
      label: "Paid Amount",
      value: "$38,950",
      change: "+8.2%",
      changeType: "increase",
      icon: TrendingUp,
      color: "blue",
    },
    {
      id: 3,
      label: "Due Amount",
      value: "$6,330",
      change: "-4.3%",
      changeType: "decrease",
      icon: Clock,
      color: "amber",
    },
    {
      id: 4,
      label: "Transactions",
      value: "248",
      change: "+18%",
      changeType: "increase",
      icon: CreditCard,
      color: "violet",
    },
  ];

  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-100 dark:border-emerald-900",
      icon: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-100 dark:border-blue-900",
      icon: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-100 dark:border-amber-900",
      icon: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
    },
    violet: {
      bg: "bg-violet-50 dark:bg-violet-950/30",
      border: "border-violet-100 dark:border-violet-900",
      icon: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-100 dark:bg-violet-900/50",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const colors = colorClasses[metric.color];

        return (
          <div
            key={metric.id}
            className={`${colors.bg} ${colors.border} border rounded-xs p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`${colors.iconBg} ${colors.icon} w-12 h-12 rounded-xs flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div
                className={`text-xs font-bold px-2 py-1 rounded-lg ${
                  metric.changeType === "increase"
                    ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                }`}
              >
                {metric.change}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                {metric.label}
              </p>
              <p className="text-3xl font-black text-foreground tracking-tight">
                {metric.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMetrics;
