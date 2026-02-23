import React from "react";
import { useBooking } from "../../../hooks/queries/useBookingQueries";
import useAuth from "../../../hooks/useAuth";
import PageHeader from "../../../components/shared/heading/PageHeader";
import { NotebookTabs, Plus } from "lucide-react";

const AllBookings = () => {
  //getting the booking data
  const { bookingsData, bLoading, bError } = useBooking();
  const { user } = useAuth();
  console.log(bookingsData);
  const isAdmin = user?.role === "admin";
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
    </div>
  );
};

export default AllBookings;
