import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

export const useUsers = (params) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: usersData = [],
    isLoading: uLoading,
    isError: uError,
  } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users", {
        params: { ...params },
      });
      return res?.data?.data;
    },
    placeholderData: (previousData) => previousData,
  });
  return { usersData, uLoading, uError };
};
