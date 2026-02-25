import {
  Eye,
  Edit,
  Ban,
  Trash,
  MapPin,
  Calendar,
  Workflow,
  UserMinus,
  UserCheck,
} from "lucide-react";
import ActionDropdown from "../../shared/button/ActionDropdown";
import NoData from "../../shared/others/NoData";

const BookingTable = ({ bookings, layout, isAdmin }) => {
  const { tableLayout } = layout;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const bookingActions = [
    { name: "View Details", icon: Eye, onClick: () => {} },
    ...(isAdmin
      ? [{ name: "Assign Caregiver", icon: Workflow, onClick: () => {} }]
      : []),
    { name: "Cancel Booking", icon: Ban, onClick: () => {} },
    {
      name: "Delete Booking",
      icon: Trash,
      onClick: () => {},
      variant: "danger",
    },
  ];

  if (!bookings || bookings.length === 0)
    return (
      <NoData
        text={"No Bookings Found"}
        subtext={"No bookings records available"}
        icon={Calendar}
      />
    );

  return (
    <div className="rounded-xs border border-border overflow-hidden bg-card shadow-sm">
      <div className={`${tableLayout ? "overflow-x-auto" : ""}`}>
        {tableLayout && (
          <table className="w-full border-collapse">
            <thead className="hidden md:table-header-group">
              <tr className="bg-muted/50 dark:bg-muted/20 border-b border-border text-left text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4 min-w-50">Tracking & Service</th>
                {isAdmin && (
                  <th className="px-6 py-4 min-w-50">Customer Email</th>
                )}
                <th className="px-6 py-4 min-w-50">Schedule</th>
                <th className="px-6 py-4">Caregiver</th>
                <th className="px-6 py-4">Booking Location</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr
                  key={booking?._id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  {/* Tracking & Service */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-mono font-bold text-sm text-foreground">
                        {booking?.trackingId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking?.serviceName}
                      </p>
                    </div>
                  </td>

                  {/* Customer (Only for Admin) */}
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-sm font-medium text-foreground">
                        {booking?.userEmail}
                      </div>
                    </td>
                  )}

                  {/* Schedule (3 Items: Created, Service Date, Duration) */}
                  <td className="px-6 py-4 capitalize">
                    <div className="flex flex-col gap-1 max-w-50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-bold">Booked :</span>{" "}
                        <span> {formatDate(booking?.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-bold">Service Date :</span>{" "}
                        <span>{formatDate(booking?.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-bold">Duration :</span>{" "}
                        <span>
                          {booking?.quantity} {booking?.durationType}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* Caregiver */}
                  <td className="px-6 py-4">
                    {booking.caregiver?.assigned ? (
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2 text-primary">
                          <UserCheck size={14} />
                          <span className="font-bold text-sm text-foreground">
                            {booking.caregiver.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground pl-5">
                          {booking.caregiver.id?.slice(-8)}
                        </span>

                        <span className="text-[11px] font-semibold text-muted-foreground pl-5 uppercase tracking-wide">
                          Ready to Serve
                        </span>
                      </div>
                    ) : (
                      <div className="rounded-xs text-[10px] px-2.5 py-1 font-bold border uppercase bg-rose-500/10 text-rose-500 border-rose-500/20 flex items-center justify-baseline w-25">
                        Not Assigned
                      </div>
                    )}
                  </td>
                  {/* Location (Full Address + District/Division) */}
                  <td className="px-6 py-4">
                    <div className="max-w-50">
                      <p
                        className="text-sm font-medium text-foreground truncate"
                        title={booking?.address}
                      >
                        {booking?.address}
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 mt-1">
                        <MapPin size={10} /> {booking?.district},{" "}
                        {booking?.division}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-xs text-[10px] font-bold border uppercase ${
                        booking?.status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      {booking?.status}
                    </span>
                  </td>

                  {/* Actions Dropdown */}
                  <td className="px-6 py-4 text-right">
                    <ActionDropdown actions={bookingActions} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTable;
