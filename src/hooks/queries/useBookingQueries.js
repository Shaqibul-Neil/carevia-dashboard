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
