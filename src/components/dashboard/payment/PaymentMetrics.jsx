import { DollarSign, CreditCard, Clock, Wallet } from "lucide-react";
import MetricsCard from "../../shared/card/MetricsCard";

const iconMap = {
  "total-price": DollarSign,
  "amount-Paid": Wallet,
  "due-amount": Clock,
  transactions: CreditCard,
};

const PaymentMetrics = ({ metricsData }) => {
  if (!metricsData || metricsData.length === 0) return null;

  //color config
  const colorConfig = {
    "total-price": {
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-500",
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
      {metricsData.map((metric, index) => (
        <MetricsCard
          key={metric._id}
          icon={iconMap[metric._id] || DollarSign}
          label={metric.label}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          gradient={colorConfig[metric._id]?.gradient}
          dotColor={colorConfig[metric._id]?.dot}
          showLiveUpdate={true}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default PaymentMetrics;
