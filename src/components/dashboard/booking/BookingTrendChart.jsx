import { TrendingUp } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";

const BookingTrendChart = ({ trendsData }) => {
  const chartRef = useRef(null); // creating address for echart

  const chartInstance = useRef(null); //creating a reference fo the chart so that we can remove or update the chart

  //get the highest booking day
  const peakDay = useMemo(() => {
    if (!trendsData || trendsData.length === 0) return null;
    const sorted = [...trendsData].sort(
      (a, b) => b.totalBookings - a.totalBookings,
    );
    return sorted[0];
  }, [trendsData]);

  //Dynamically import ECharts
  useEffect(() => {
    const initChart = async () => {
      const echarts = await import("echarts");
      //if no div available to create chart
      if (!chartRef.current) return;
      //if there are old chart then remove it otherwise there will be multiple chart
      if (chartInstance.current) chartInstance.current.dispose();

      //create new chart
      const bookingChart = echarts.init(chartRef.current);
      chartInstance.current = bookingChart;

      //data organization
      const dates = trendsData.map((item) => item.date);
      const values = trendsData.map((item) => item.totalBookings);
      const maxValue = Math.max(...values);

      //main chart logic
      const option = {
        grid: {
          top: 5,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: false,
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#10b981",
          borderWidth: 1,
          textStyle: { color: "#1e293b", fontSize: 11, fontWeight: "bold" },
          extraCssText:
            "z-index: 1000; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);",
          formatter: "{b}: {c} Bookings",
        },
        xAxis: {
          type: "category",
          data: dates,
          show: false,
          //   boundaryGap: true,
        },
        yAxis: {
          type: "value",
          show: false,
          max: maxValue * 2,
        },
        series: [
          {
            data: values.map((val) => ({
              value: val,
              itemStyle: { color: val === maxValue ? "#0f172a" : "#34d399" },
              borderRadius: [4, 4, 0, 0],
            })),
            type: "bar",
            barCategoryGap: "10%",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
              borderRadius: [4, 4, 0, 0],
            },
            emphasis: {
              itemStyle: {
                color: "#059669", //hover color
              },
            },
          },
        ],
      };
      bookingChart.setOption(option);

      //sidebar open close resize handle
      const handleResize = () => {
        if (bookingChart) {
          bookingChart.resize();
        }
      };
      window.addEventListener("resize", handleResize);

      //Resize Observer
      const resizeObserver = new ResizeObserver(() => handleResize());
      if (chartRef.current) resizeObserver.observe(chartRef.current);
      return () => {
        window.removeEventListener("resize", handleResize);
        resizeObserver.disconnect();
        bookingChart.dispose();
      };
    };
    initChart();
  }, [trendsData]);

  return (
    <div className="relative group cursor-pointer transform transition-all duration-700 h-[114px]">
      {/* Subtle Glow Effect */}
      <div className="absolute -inset-1 bg-linear-to-br from-emerald-400 to-teal-500 rounded-xs opacity-5 group-hover:opacity-20 transition-all duration-700"></div>

      {/* Glass Morphism Card */}
      <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-xs py-2 px-5 overflow-hidden h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Booking Trends
          </p>
          <TrendingUp size={14} className="text-emerald-500" />
        </div>

        {/* Chart Container */}
        <div className="relative h-10 w-full mt-2">
          <div ref={chartRef} style={{ height: "100%", width: "100%" }} />
        </div>

        {/* Peak Booking */}
        <div className="mt-4">
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Peak bookings on{" "}
            <span className="text-emerald-500 font-bold">
              {peakDay ? peakDay.date : "..."}
            </span>
          </p>
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingTrendChart;
