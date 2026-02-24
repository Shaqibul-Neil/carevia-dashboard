import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

export const useBooking = (params) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: bookingsData = [],
    isLoading: bLoading,
    isError: bError,
  } = useQuery({
    queryKey: ["bookings", params],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/booking", {
        params: { ...params },
      });
      console.log("res", res);
      return res?.data?.data;
    },
    placeholderData: (previousData) => previousData,
  });
  return { bookingsData, bLoading, bError };
};

export const useBookingStats = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: metricsData = [],
    isLoading: mLoading,
    isError: mError,
  } = useQuery({
    queryKey: ["booking-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/booking/stats");
      return res?.data?.data;
    },
  });
  return { metricsData, mLoading, mError };
};
