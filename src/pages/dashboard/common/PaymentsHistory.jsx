import { Download, Receipt } from "lucide-react";
import PaymentMetrics from "../../../components/dashboard/payment/PaymentMetrics";
import PaymentTable from "../../../components/dashboard/payment/PaymentTable";
import Pagination from "../../../components/shared/menu/Pagination";
import Button from "../../../components/shared/button/Button";
import PageHeader from "../../../components/shared/heading/PageHeader";
import Loading from "../../../components/shared/loading/Loading";
import Error from "../../../components/shared/others/Error";
import Filter from "../../../components/shared/menu/Filter";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  usePayments,
  usePaymentStats,
} from "../../../hooks/queries/usePaymentQueries";

const PaymentsHistory = () => {
  const [params, setParams] = useState({
    search: "",
    sortby: "all",
    status: "all",
    method: "all",
    page: 1,
    limit: 2,
  });
  const [tableLayout, setTableLayout] = useState(false);
  const [cardLayout, setCardLayout] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const layout = { tableLayout, setTableLayout, cardLayout, setCardLayout };

  useEffect(() => {
    setTableLayout(true);
  }, []);

  //sort options
  const sortOptions = [
    { label: "Sort By (Default)", value: "all" },
    { label: "Date (Newest First)", value: "createdAt-desc" },
    { label: "Date (Oldest First)", value: "createdAt-asc" },
    { label: "Total (High to Low)", value: "totalPrice-desc" },
    { label: "Total (Low to High)", value: "totalPrice-asc" },
    { label: "Paid (High to Low)", value: "amountPaid-desc" },
    { label: "Paid (Low to High)", value: "amountPaid-asc" },
    { label: "Due (High to Low)", value: "dueAmount-desc" },
    { label: "Due (Low to High)", value: "dueAmount-asc" },
  ];

  //filter configuration
  const filterConfigs = [
    {
      name: "status",
      label: "Status",
      options: [
        { label: "Paid", value: "paid" },
        { label: "Due", value: "due" },
      ],
    },
    {
      name: "method",
      label: "Method",
      options: [
        { label: "Card", value: "card" },
        { label: "Cash", value: "cash" },
      ],
    },
  ];

  //getting the payments data
  const { paymentData, pLoading, pError } = usePayments(params);

  const { metricsData, mLoading, mError } = usePaymentStats();

  if (pLoading || mLoading) return <Loading />;
  if (pError || mError) return <Error />;

  const payments = paymentData?.payments || [];
  const totalPages = paymentData?.totalPages || 0;
  const totalItems = paymentData?.totalItems || 0;

  return (
    <div className="min-h-screen font-sans w-full pb-10 space-y-6">
      {/* Page Header */}
      <PageHeader
        title={isAdmin ? "Payments Management" : "My Payment History"}
        subText={
          isAdmin
            ? "Overview of all system transactions and revenue metrics."
            : "Review and track your transaction history and outstanding dues."
        }
        icon={Receipt}
        buttonText="Download PDF"
        buttonIcon={<Download size={18} />}
        onButtonClick={() => console.log("Downloading...")}
      />

      {/* Payment Metrics */}
      <PaymentMetrics metricsData={metricsData} />

      {/* Main Content Card */}
      <div className="bg-card space-y-6">
        {/* Filter */}
        <Filter
          params={params}
          setParams={setParams}
          layout={layout}
          isAdmin={isAdmin}
          sortOptions={sortOptions}
          filterConfigs={filterConfigs}
        />

        <div className="px-4 py-3 bg-muted/50 dark:bg-muted/20">
          <h2 className="text-sm text-muted-foreground mb-1">
            Showing {String(payments.length).padStart(2, "0")} data of{" "}
            {String(totalItems).padStart(2, "0")} data
          </h2>

          {/* Payment Table */}

          <PaymentTable payments={payments} role={user?.role} layout={layout} />
        </div>

        {/* Pagination */}

        {payments.length > 0 && (
          <Pagination
            setParams={setParams}
            currentPage={params.page}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsHistory;
