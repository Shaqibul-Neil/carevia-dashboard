import { CalendarCheck, Users, Ban, TrendingUp } from "lucide-react";
import MetricsCard from "../../shared/card/MetricsCard";
import BookingTrendChart from "./BookingTrendChart";
import BookingUserStat from "./BookingUserStat";

const iconMap = {
  "total-bookings": Users,
  confirmed: CalendarCheck,
  cancelled: Ban,
};

const BookingMetrics = ({ metricsData, trendsData, isAdmin, isUser }) => {
  if (
    !metricsData ||
    metricsData.length === 0 ||
    !trendsData ||
    trendsData.length === 0
  )
    return null;

  //color config
  const colorConfig = {
    "total-bookings": {
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-500",
    },
    confirmed: {
      gradient: "bg-gradient-to-br from-emerald-400 to-teal-500",
    },
    cancelled: {
      gradient: "bg-gradient-to-br from-rose-400 to-red-500",
    },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <MetricsCard
          key={metric._id}
          icon={iconMap[metric._id] || Users}
          label={metric.label}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          gradient={colorConfig[metric._id]?.gradient}
          delay={index * 100}
        />
      ))}

      {/* The Chart Widget */}
      {isAdmin && <BookingTrendChart trendsData={trendsData} />}
      {isUser && <BookingUserStat trendsData={trendsData} />}
    </div>
  );
};

export default BookingMetrics;
