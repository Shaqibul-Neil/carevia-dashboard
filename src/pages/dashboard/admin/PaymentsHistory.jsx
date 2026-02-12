import { Download, Receipt } from "lucide-react";
import PaymentMetrics from "../../../components/dashboard/PaymentMetrics";
import PaymentTable from "../../../components/admin/table/PaymentTable";
import Pagination from "../../../components/shared/Pagination";
import Button from "../../../components/shared/Button";

const PaymentsHistory = () => {
  // Single Dummy Payment Data
  const payment = {
    trackingId: "CV08395F",
    userName: "Kamal Hasan",
    userEmail: "kamal@gmail.com",
    serviceName: "Elder Hygiene Care",
    totalPrice: "180",
    amountPaid: "90",
    dueAmount: "90",
    paymentMethod: "card",
    createdAt: "2026-02-11T08:48:23.397Z",
  };

  return (
    <div className="min-h-screen font-sans w-full pb-10 space-y-6">
      {/* Page Header */}
      <div className="bg-card dark:bg-card rounded-xs p-6 md:p-8 shadow-sm border border-border relative overflow-hidden group">
        {/* Ambient Background Effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-400/10 transition-colors duration-700"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Title Section */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
              Payments{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                History
              </span>
              <Receipt
                className="text-muted-foreground/20 dark:text-muted-foreground/10 mt-1"
                size={36}
              />
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-medium max-w-lg">
              Track and manage all payment transactions, revenue, and
              outstanding dues.
            </p>
          </div>

          {/* Download PDF Button */}
          <Button icon={<Download size={18} />}>Download PDF</Button>
        </div>
      </div>

      {/* Payment Metrics */}
      <PaymentMetrics />

      {/* Main Content Card */}
      <div className="bg-card space-y-6">
        {/* Payment Table */}
        <PaymentTable payment={payment} />

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  );
};

export default PaymentsHistory;
