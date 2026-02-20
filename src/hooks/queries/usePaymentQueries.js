import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

export const usePayments = (params) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: paymentData = [],
    isLoading: pLoading,
    isError: pError,
  } = useQuery({
    queryKey: ["payments", params],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payment", {
        params: { ...params },
      });
      return res?.data?.data;
    },
  });
  return { paymentData, pLoading, pError };
};

export const usePaymentStats = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: metricsData = [],
    isLoading: mLoading,
    isError: mError,
  } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payment/stats");
      return res?.data?.data;
    },
  });
  return { metricsData, mLoading, mError };
};
