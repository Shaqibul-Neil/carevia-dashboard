import { Home, Calendar, CreditCard, MessageSquare } from "lucide-react";
import SidebarLinks from "./SidebarLinks";

const UserMenu = () => {
  return (
    <>
      {/* Dashboard */}
      <li>
        <SidebarLinks to="/" icon={Home} label="Dashboard" />
      </li>

      {/* My Bookings */}
      <li>
        <SidebarLinks
          to="/user/my-booking"
          icon={Calendar}
          label="My Booking"
        />
      </li>

      {/* My Payments History */}
      <li>
        <SidebarLinks
          to="/user/my-payments-history"
          icon={CreditCard}
          label="My Payments History"
        />
      </li>

      {/* Chat */}
      <li>
        <SidebarLinks to="/chat" icon={MessageSquare} label="Chat" />
      </li>
    </>
  );
};

export default UserMenu;
