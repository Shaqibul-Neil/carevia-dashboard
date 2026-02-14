import Loading from "../../components/shared/loading/Loading";
import Error from "../../components/shared/others/Error";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payment");
      return res.data.data.payments || res.data;
    },
  });
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
      {/* Role-based rendering */}
      {user?.role === "admin" && (
        <div className="bg-blue-100 p-4 rounded">
          <h2>Admin Panel</h2>
          {/* Admin-specific content */}
        </div>
      )}
      {user?.role === "user" && (
        <div className="bg-green-100 p-4 rounded">
          <h2>User Dashboard</h2>
          {/* Citizen-specific content */}
        </div>
      )}
    </div>
  );
};

export default Home;
