import React from "react";

const MetricsCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeType,
  gradient,
  dotColor,
  showLiveUpdate = false,
  delay = 0,
}) => {
  const isDecrease = changeType === "decrease";
  const getChangeColor = () => {
    if (isDecrease) {
      return changeType === "increase" ? "text-rose-500" : "text-emerald-500";
    }
    return changeType === "increase" ? "text-emerald-500" : "text-rose-500";
  };

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-700 hover:scale-101 hover:-translate-y-3"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Subtle Glow Effect */}
      <div
        className={`absolute -inset-1 ${gradient} rounded-xs opacity-5 group-hover:opacity-20 transition-all duration-700`}
      ></div>

      {/* Glass Morphism Card */}
      <div className="relative bg-card/95 backdrop-blur-xl rounded-xs py-2 px-5 overflow-hidden group-hover:shadow-sm transition-all duration-500">
        {/* Floating Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] transform rotate-12 group-hover:rotate-45 transition-transform duration-1000 pointer-events-none">
          {Icon && <Icon size={120} className="text-foreground" />}
        </div>

        {/* Premium Floating Orb */}
        <div
          className={`absolute top-6 right-6 w-8 h-8 ${gradient} rounded-xs flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
        >
          <Icon size={18} className="text-white" />
        </div>

        {/* Content Area */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] block mb-1">
                {label}
              </span>
              {showLiveUpdate && (
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 ${dotColor} rounded-full animate-pulse`}
                  ></div>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Live Update
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-3xl font-black text-foreground tracking-tight leading-none">
              {value}
            </div>

            {/* Change Type Indicator */}
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] font-bold ${getChangeColor()}`}>
                {changeType === "increase" ? "↑" : "↓"} {change}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium capitalize tracking-wider">
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
};

export default MetricsCard;
