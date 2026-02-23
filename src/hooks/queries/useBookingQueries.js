import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

export const useBooking = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: bookingsData = [],
    isLoading: bLoading,
    isError: bError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/booking");
      console.log(res);
      return res?.data?.data;
    },
  });
  return { bookingsData, bLoading, bError };
};
