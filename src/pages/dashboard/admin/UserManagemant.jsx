import { useState } from "react";
import { useUsers } from "../../../hooks/queries/useUsersQueries";
import Error from "../../../components/shared/others/Error";
import Loading from "../../../components/shared/loading/Loading";
import Pagination from "../../../components/shared/menu/Pagination";
import Filter from "../../../components/shared/menu/Filter";
import { Users } from "lucide-react";
import PageHeader from "../../../components/shared/heading/PageHeader";

const UserManagement = () => {
  const [params, setParams] = useState({
    search: "",
    sortby: "all",
    isVerified: "all",
    isActive: "all",
    page: 1,
    limit: 5,
  });
  const [tableLayout, setTableLayout] = useState(true);
  const [cardLayout, setCardLayout] = useState(false);
  const layout = { tableLayout, setTableLayout, cardLayout, setCardLayout };

  //sort options
  const sortOptions = [
    { label: "Sort By (Default)", value: "all" },
    { label: "Joined (Newest First)", value: "createdAt-desc" },
    { label: "Joined (Oldest First)", value: "createdAt-asc" },
  ];

  //filter configuration
  const filterConfigs = [
    {
      name: "isVerified",
      label: "Verified",
      options: [
        { label: "Verified", value: "true" },
        { label: "Not Verified", value: "false" },
      ],
    },
    {
      name: "isActive",
      label: "Active",
      options: [
        { label: "Active", value: "true" },
        { label: "InActive", value: "false" },
      ],
    },
  ];

  //getting the booking data
  const { usersData, uLoading, uError } = useUsers(params);
  if (uLoading) return <Loading />;
  if (uError) return <Error />;
  const users = usersData?.users || [];
  const totalPages = usersData?.totalPages || 0;
  const totalItems = usersData?.totalItems || 0;

  return (
    <div className="min-h-screen font-sans w-full pb-10 space-y-6">
      {/* Page Header */}
      <PageHeader
        title="User Management"
        subText={"Manage all your users information and updates here."}
        icon={Users}
        // buttonText=''
        // buttonIcon={<Plus size={18} />}
        // onButtonClick={() => console.log("Adding...")}
      />

      {/* <BookingMetrics
        metricsData={metricsData}
        trendsData={trendsData}
        isUser={isUser}
        isAdmin={isAdmin}
      /> */}

      <div className="space-y-6 bg-card">
        <Filter
          params={params}
          setParams={setParams}
          layout={layout}
          sortOptions={sortOptions}
          filterConfigs={filterConfigs}
          searchPlaceholder="Search by user name or email..."
        />
        <div className="px-4 py-3 bg-muted/50 dark:bg-muted/20">
          <h2 className="text-sm text-muted-foreground mb-1">
            Showing {String(users.length).padStart(2, "0")} data of{" "}
            {String(totalItems).padStart(2, "0")} data
          </h2>

          {/* Bookings Table */}
          {/* <BookingTable bookings={bookings} layout={layout} isAdmin={isAdmin} /> */}
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

export default UserManagement;
