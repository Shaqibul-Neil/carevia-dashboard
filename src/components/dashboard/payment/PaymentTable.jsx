import { CreditCard, EllipsisVertical, Eye, Trash } from "lucide-react";
import React from "react";
import NoData from "../../shared/others/NoData";
import ActionDropdown from "../../shared/button/ActionDropdown";

const PaymentTable = ({ payments, layout, role }) => {
  const isAdmin = role === "admin";

  const paymentActions = [
    { name: "Details", icon: Eye, onClick: () => {} },
    { name: "Delete", icon: Trash, onClick: () => {}, variant: "danger" },
  ];

  const { tableLayout, cardLayout } = layout;

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

  if (payments.length === 0) {
    return (
      <NoData
        text={"No Payments Found"}
        subtext={"No payment records available"}
        icon={CreditCard}
      />
    );
  }

  return (
    <div
      className={`rounded-xs ${cardLayout ? "p-4" : ""} border border-border overflow-hidden bg-card`}
    >
      <div className={`${tableLayout ? "overflow-x-auto" : ""}`}>
        {tableLayout && (
          <table className="w-full border-collapse">
            {/* Desktop Header */}
            <thead className="hidden md:table-header-group">
              <tr className="bg-muted/50 dark:bg-muted/20 border-b border-border text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4 min-w-50">Tracking & Service</th>

                {isAdmin && <th className="px-6 py-4 min-w-45">Customer</th>}

                <th className="px-6 py-4 text-center min-w-30">Date</th>
                <th className="px-6 py-4 text-right min-w-30">Total</th>
                <th className="px-6 py-4 text-right min-w-30">Paid</th>
                <th className="px-6 py-4 text-right min-w-30">Due</th>
                <th className="px-6 py-4 text-center min-w-30">Method</th>
                <th className="px-6 py-4 text-center min-w-30">Settings</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <React.Fragment key={payment._id}>
                  {/* Desktop Row */}

                  <tr className="hidden md:table-row hover:bg-muted/30 dark:hover:bg-muted/10 transition-colors duration-200 border-b border-border">
                    {/* Tracking & Service */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-mono font-bold text-sm text-foreground mb-1">
                          {payment?.trackingId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment?.serviceName}
                        </p>
                      </div>
                    </td>

                    {/* Customer */}
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {payment?.userName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {payment?.userEmail}
                          </p>
                        </div>
                      </td>
                    )}

                    {/* Date */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {formatDate(payment?.createdAt)}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-foreground">
                        {formatCurrency(payment?.totalPrice)}
                      </span>
                    </td>

                    {/* Paid */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(payment?.amountPaid)}
                      </span>
                    </td>

                    {/* Due */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        {formatCurrency(payment?.dueAmount)}
                      </span>
                    </td>

                    {/* Method */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs text-xs font-semibold bg-muted/50 dark:bg-muted/20 text-foreground border border-border">
                        <CreditCard size={14} />
                        {payment?.paymentMethod}
                      </span>
                    </td>
                    {/* Actions Dropdown */}
                    <td className="px-6 py-4 text-right">
                      <ActionDropdown actions={paymentActions} />
                    </td>
                  </tr>

                  {/* Mobile Card */}
                  <tr className="md:hidden">
                    <td colSpan="7" className="px-4 py-4">
                      <div className="bg-muted/30 dark:bg-muted/10 rounded-xs border border-border p-5 space-y-4">
                        {/* Tracking ID */}
                        <div className="flex items-center justify-between">
                          <p className="font-mono font-bold text-sm text-foreground flex flex-col">
                            <span className="text-muted-foreground text-xs">
                              Tracking Id
                            </span>
                            <span>{payment?.trackingId}</span>
                          </p>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {formatDate(payment?.createdAt)}
                          </span>
                          {/* Actions Dropdown */}
                          <div className="px-6 py-4 text-right">
                            <ActionDropdown actions={paymentActions} />
                          </div>
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
                              {payment?.userName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payment?.userEmail}
                            </p>
                          </div>
                          <div className="flex justify-center">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs text-xs font-semibold bg-muted/50 dark:bg-muted/20 text-foreground border border-border">
                              <CreditCard size={14} />
                              {payment?.paymentMethod}
                            </span>
                          </div>
                        </div>

                        {/* Payment Details Grid */}
                        <div className="flex flex-col gap-3">
                          <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                              Total
                            </p>
                            <p className="font-bold text-sm text-foreground">
                              {formatCurrency(payment?.totalPrice)}
                            </p>
                          </div>
                          <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                              Paid
                            </p>
                            <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                              {formatCurrency(payment?.amountPaid)}
                            </p>
                          </div>
                          <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                              Due
                            </p>
                            <p className="font-bold text-sm text-amber-600 dark:text-amber-400">
                              {formatCurrency(payment?.dueAmount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}

        {cardLayout && (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-3">
            {payments.map((payment) => (
              <div className="bg-muted/30 dark:bg-muted/10 rounded-xs border border-border p-5 space-y-4">
                {/* Tracking ID */}
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-sm text-foreground flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      Tracking Id
                    </span>
                    <span>{payment?.trackingId}</span>
                  </p>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {formatDate(payment?.createdAt)}
                  </span>
                  {/* Actions Dropdown */}
                  <div className="px-6 py-4 text-right">
                    <ActionDropdown actions={paymentActions} />
                  </div>
                </div>

                {/* Service */}
                <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Service</p>
                  <p className="font-medium text-sm text-foreground">
                    {payment.serviceName}
                  </p>
                </div>

                {/* Customer and Method*/}
                <div className="flex justify-between items-center">
                  {isAdmin && (
                    <div>
                      <p className="font-semibold text-foreground">
                        {payment?.userName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment?.userEmail}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs text-xs font-semibold bg-muted/50 dark:bg-muted/20 text-foreground border border-border">
                      <CreditCard size={14} />
                      {payment?.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Payment Details Grid */}
                <div className="flex flex-col gap-3">
                  <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                      Total
                    </p>
                    <p className="font-bold text-sm text-foreground">
                      {formatCurrency(payment?.totalPrice)}
                    </p>
                  </div>
                  <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                      Paid
                    </p>
                    <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(payment?.amountPaid)}
                    </p>
                  </div>
                  <div className="bg-card dark:bg-card/50 p-3 rounded-xs border border-border">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">
                      Due
                    </p>
                    <p className="font-bold text-sm text-amber-600 dark:text-amber-400">
                      {formatCurrency(payment?.dueAmount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;
