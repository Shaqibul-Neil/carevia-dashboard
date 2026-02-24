import { CalendarCheck, Users, Ban, TrendingUp } from "lucide-react";
import MetricsCard from "../../shared/card/MetricsCard";

const iconMap = {
  "total-bookings": Users,
  confirmed: CalendarCheck,
  cancelled: Ban,
};

const BookingMetrics = ({ metricsData }) => {
  if (!metricsData || metricsData.length === 0) return null;

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
      <div className="bg-card border border-border p-5 rounded-xs flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Booking Trends
          </p>
          <TrendingUp size={14} className="text-emerald-500" />
        </div>
        {/* Simple CSS-based Sparkline Mockup */}
        <div className="flex items-end gap-1 h-12">
          {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-xs"
            />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          Peak bookings on Monday
        </p>
      </div>
    </div>
  );
};

export default BookingMetrics;
