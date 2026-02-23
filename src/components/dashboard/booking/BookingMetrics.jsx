import { CalendarCheck, Users, Ban, TrendingUp } from "lucide-react";

const BookingMetrics = () => {
  const metrics = [
    {
      label: "Total Bookings",
      value: "1,280",
      change: "+12.5%",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Upcoming",
      value: "84",
      change: "+5.2%",
      icon: CalendarCheck,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Cancelled",
      value: "12",
      change: "-2.1%",
      icon: Ban,
      color: "from-rose-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-card border border-border p-5 rounded-xs relative overflow-hidden group"
        >
          <div
            className={`absolute top-0 right-0 p-3 bg-linear-to-br ${m.color} opacity-10 group-hover:opacity-20 transition-opacity`}
          >
            <m.icon size={48} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {m.label}
            </p>
            <h3 className="text-3xl font-black mt-2">{m.value}</h3>
            <p
              className={`text-[11px] font-bold mt-1 ${m.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}
            >
              {m.change}{" "}
              <span className="text-muted-foreground font-medium">
                vs last month
              </span>
            </p>
          </div>
        </div>
      ))}

      {/* The Chart Widget (Senior UX Touch) */}
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
