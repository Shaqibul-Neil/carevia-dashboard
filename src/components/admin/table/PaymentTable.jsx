import { CreditCard } from "lucide-react";

const PaymentTable = ({ payment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  if (!payment) {
    return (
      <div className="rounded-xs border border-border overflow-hidden bg-card">
        <div className="px-6 py-32 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 bg-muted/50 dark:bg-muted/20 rounded-xs flex items-center justify-center text-muted-foreground">
              <CreditCard size={32} />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">
                No Payments Found
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                No payment records available
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xs border border-border overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Desktop Header */}
          <thead className="hidden md:table-header-group">
            <tr className="bg-muted/50 dark:bg-muted/20 border-b border-border text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="px-6 py-4 min-w-[200px]">Tracking & Service</th>
              <th className="px-6 py-4 min-w-[180px]">Customer</th>
              <th className="px-6 py-4 text-center min-w-[120px]">Date</th>
              <th className="px-6 py-4 text-right min-w-[120px]">Total</th>
              <th className="px-6 py-4 text-right min-w-[120px]">Paid</th>
              <th className="px-6 py-4 text-right min-w-[120px]">Due</th>
              <th className="px-6 py-4 text-center min-w-[120px]">Method</th>
            </tr>
          </thead>

          <tbody>
            {/* Desktop Row */}
            <tr className="hidden md:table-row hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors duration-200 border-b border-border">
              {/* Tracking & Service */}
              <td className="px-6 py-4">
                <div>
                  <p className="font-mono font-bold text-sm text-foreground mb-1">
                    {payment.trackingId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.serviceName}
                  </p>
                </div>
              </td>

              {/* Customer */}
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {payment.userName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.userEmail}
                  </p>
                </div>
              </td>

              {/* Date */}
              <td className="px-6 py-4 text-center">
                <span className="text-xs font-semibold text-muted-foreground">
                  {formatDate(payment.createdAt)}
                </span>
              </td>

              {/* Total */}
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-bold text-foreground">
                  {formatCurrency(payment.totalPrice)}
                </span>
              </td>

              {/* Paid */}
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(payment.amountPaid)}
                </span>
              </td>

              {/* Due */}
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {formatCurrency(payment.dueAmount)}
                </span>
              </td>

              {/* Method */}
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-muted/50 dark:bg-muted/20 text-foreground border border-border">
                  <CreditCard size={14} />
                  {payment.paymentMethod}
                </span>
              </td>
            </tr>

            {/* Mobile Card */}
            <tr className="md:hidden">
              <td colSpan="7" className="px-4 py-4">
                <div className="bg-muted/30 dark:bg-muted/10 rounded-xs border border-border p-5 space-y-4">
                  {/* Tracking ID */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-foreground">
                      {payment.trackingId}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {formatDate(payment.createdAt)}
                    </span>
                  </div>

                  {/* Service */}
                  <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Service
                    </p>
                    <p className="font-medium text-sm text-foreground">
                      {payment.serviceName}
                    </p>
                  </div>

                  {/* Customer and Method*/}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">
                        {payment.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.userEmail}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-muted/50 dark:bg-muted/20 text-foreground border border-border">
                        <CreditCard size={14} />
                        {payment.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Payment Details Grid */}
                  <div className="flex flex-col gap-3">
                    <div className="bg-card dark:bg-card/50 p-3 rounded-xl border border-border">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                        Total
                      </p>
                      <p className="font-bold text-sm text-foreground">
                        {formatCurrency(payment.totalPrice)}
                      </p>
                    </div>
                    <div className="bg-card dark:bg-card/50 p-3 rounded-xl border border-border">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                        Paid
                      </p>
                      <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(payment.amountPaid)}
                      </p>
                    </div>
                    <div className="bg-card dark:bg-card/50 p-3 rounded-xl border border-border">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                        Due
                      </p>
                      <p className="font-bold text-sm text-amber-600 dark:text-amber-400">
                        {formatCurrency(payment.dueAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Method */}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
