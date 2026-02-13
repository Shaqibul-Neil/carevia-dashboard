import { Download, Receipt } from "lucide-react";
import PaymentMetrics from "../../../components/dashboard/payment/admin/PaymentMetrics";
import PaymentTable from "../../../components/dashboard/payment/admin/PaymentTable";
import Pagination from "../../../components/shared/menu/Pagination";
import Button from "../../../components/shared/button/Button";
import PageHeader from "../../../components/shared/heading/PageHeader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/loading/Loading";
import Error from "../../../components/shared/others/Error";
import Filter from "../../../components/shared/menu/Filter";

const PaymentsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payment");
      return res.data.data.payments;
    },
  });
  console.log(payments);
  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="min-h-screen font-sans w-full pb-10 space-y-6">
      {/* Page Header */}
      <div className="bg-card dark:bg-card rounded-xs p-6 md:p-8 shadow-sm border border-border relative overflow-hidden group">
        {/* Ambient Background Effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 dark:group-hover:bg-emerald-400/10 transition-colors duration-700"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Title Section */}
          <PageHeader
            title={"Payments History"}
            subText={
              "Track and manage all payment transactions, revenue, and              outstanding dues."
            }
            icon={Receipt}
          />

          {/* Download PDF Button */}
          <Button className={"px-4 py-2.5"} icon={<Download size={18} />}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Payment Metrics */}
      <PaymentMetrics />

      {/* Main Content Card */}
      <div className="bg-card space-y-6">
        {/* Filter */}
        <Filter />
        <div>
          <h2 className="text-sm text-muted-foreground mb-1">
            Showing 0{payments.length} data of 0{payments.length} data
          </h2>
          {/* Payment Table */}
          <PaymentTable payments={payments} />
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default PaymentsHistory;
