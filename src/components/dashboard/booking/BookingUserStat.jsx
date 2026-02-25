import React from "react";
import { Calendar, ClipboardList, Clock, Hash } from "lucide-react";

/**
 * BookingUserStat - Consistent with MetricsCard UI/UX
 */
const BookingUserStat = ({ trendsData }) => {
  if (!trendsData || trendsData.length === 0) return null;

  return (
    <div className="relative group h-full bg-foreground">
      {/* Main Glass Morphism Card with Subtle Border */}
      <div className="relative border-2 border-green-600 group-hover:border-green-800 rounded-xs py-2 px-5 overflow-hidden h-full flex flex-col gap-3 transition-colors duration-500">
        {/* Header */}
        <div className="flex items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Upcoming Services
          </p>
        </div>

        {/* Content Area - Data Visualization */}
        <div className="relative z-10">
          {trendsData.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between gap-1"
            >
              {/* Service Details Section */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col w-30">
                  <h4 className="text-[13px] font-black text-muted tracking-tight leading-tight">
                    {item.serviceName}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Hash size={10} className="text-muted-foreground" />
                    <span className="text-[10px] font-semibold text-muted-foreground/80">
                      {item.trackingId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule Section - Fixed Width for consistency */}
              <div className="w-20 space-y-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-emerald-400" />
                    <p className="text-[11px] font-bold text-muted">
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingUserStat;
