
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import UserDashboardHeader from "@/components/user-dashboard/UserDashboardHeader";
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";
import UserHome from "@/components/user-dashboard/UserHome";
import UserBookings from "@/components/user-dashboard/UserBookings";
import UserMessages from "@/components/user-dashboard/UserMessages";
import UserNotifications from "@/components/user-dashboard/UserNotifications";
import UserMatches from "@/components/user-dashboard/UserMatches";
import UserSavedClasses from "@/components/user-dashboard/UserSavedClasses";
import UserProfile from "@/components/user-dashboard/UserProfile";
import UserPreferences from "@/components/preferences/UserPreferences";
import UserReviews from "@/components/user-dashboard/UserReviews";
import UserWaitlist from "@/components/user-dashboard/UserWaitlist";
import UserPayments from "@/components/user-dashboard/UserPayments";

const UserDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-50">
        <UserDashboardSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<UserDashboardOverview />} />
              <Route path="/bookings" element={<UserBookings />} />
              <Route path="/messages" element={<UserMessages />} />
              <Route path="/notifications" element={<UserNotifications />} />
              <Route path="/matches" element={<UserMatches />} />
              <Route path="/saved" element={<UserSavedClasses />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/preferences" element={<UserPreferences />} />
              <Route path="/reviews" element={<UserReviews />} />
              <Route path="/waitlist" element={<UserWaitlist />} />
              <Route path="/payments" element={<UserPayments />} />
            </Routes>
          </main>
          <UserDashboardHeader />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;
