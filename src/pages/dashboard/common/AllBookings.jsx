import React, { useEffect, useState } from "react";
import {
  useBooking,
  useBookingStats,
} from "../../../hooks/queries/useBookingQueries";
import useAuth from "../../../hooks/useAuth";
import PageHeader from "../../../components/shared/heading/PageHeader";
import { NotebookTabs, Plus } from "lucide-react";
import BookingMetrics from "../../../components/dashboard/booking/BookingMetrics";
import Filter from "../../../components/shared/menu/Filter";
import BookingTable from "../../../components/dashboard/booking/BookingTable";
import Pagination from "../../../components/shared/menu/Pagination";
import Error from "../../../components/shared/others/Error";
import Loading from "../../../components/shared/loading/Loading";

const AllBookings = () => {
  const [params, setParams] = useState({
    search: "",
    sortby: "all",
    status: "all",
    duration: "all",
    caregiver: "all",
    division: "all",
    page: 1,
    limit: 5,
  });
  const [tableLayout, setTableLayout] = useState(true);
  const [cardLayout, setCardLayout] = useState(false);
  const { user } = useAuth();
  console.log(user);
  const isAdmin = user?.role === "admin";
  const layout = { tableLayout, setTableLayout, cardLayout, setCardLayout };

  //sort options
  const sortOptions = [
    { label: "Sort By (Default)", value: "all" },
    { label: "Booking Date (Newest First)", value: "createdAt-desc" },
    { label: "Booking (Oldest First)", value: "createdAt-asc" },
    { label: "Service Date (Newest First)", value: "date-desc" },
    { label: "Service Date (Oldest First)", value: "date-asc" },
  ];

  //filter configuration
  const filterConfigs = [
    {
      name: "status",
      label: "Status",
      options: [
        { label: "Booked", value: "booked" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "duration",
      label: "Duration",
      options: [
        { label: "Days", value: "days" },
        { label: "Hours", value: "hours" },
      ],
    },
    {
      name: "caregiver",
      label: "Caregiver",
      options: [
        { label: "Assigned", value: "assigned" },
        { label: "Unassigned", value: "unassigned" },
      ],
    },
    {
      name: "division",
      label: "Division",
      options: [
        { label: "Dhaka", value: "Dhaka" },
        { label: "Chattogram", value: "Chattogram" },
        { label: "Sylhet", value: "Sylhet" },
        { label: "Rajshahi", value: "Rajshahi" },
        { label: "Khulna", value: "Khulna" },
        { label: "Rangpur", value: "Rangpur" },
        { label: "Barisal", value: "Barisal" },
        { label: "Mymensingh", value: "Mymensingh" },
      ],
    },
  ];

  //getting the booking data
  const { bookingsData, bLoading, bError } = useBooking(params);
  const { metricsData, mLoading, mError } = useBookingStats();

  if (bLoading || mLoading) return <Loading />;
  if (bError || mError) return <Error />;

  const bookings = bookingsData?.bookings || [];
  const totalPages = bookingsData?.totalPages || 0;
  console.log(totalPages);
  const totalItems = bookingsData?.totalItems || 0;

  return (
    <div className="min-h-screen font-sans w-full pb-10 space-y-6">
      {/* Page Header */}
      <PageHeader
        title={isAdmin ? "All Bookings" : "My Bookings"}
        subText={
          isAdmin
            ? "Manage all your customer appointments and schedules here."
            : "Manage all your appointments and schedules here"
        }
        icon={NotebookTabs}
        buttonText={isAdmin ? "Add New Service" : "Create A Booking"}
        buttonIcon={<Plus size={18} />}
        onButtonClick={() => console.log("Adding...")}
      />

      <BookingMetrics metricsData={metricsData} />

      <div className="space-y-6 bg-card">
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
            Showing {String(bookings.length).padStart(2, "0")} data of{" "}
            {String(totalItems).padStart(2, "0")} data
          </h2>

          {/* Bookings Table */}
          <BookingTable bookings={bookings} layout={layout} isAdmin={isAdmin} />
        </div>

        <Pagination
          currentPage={params.page}
          totalPages={totalPages}
          setParams={setParams}
        />
      </div>
    </div>
  );
};

export default AllBookings;
