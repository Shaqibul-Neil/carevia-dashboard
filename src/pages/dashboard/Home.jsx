import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: services = [], refetch } = useQuery({
    queryKey: ["all-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/services");
      return res.data.data.services || [];
    },
  });
  console.log(services);
  return <div>Dashboard Home</div>;
};

export default Home;
