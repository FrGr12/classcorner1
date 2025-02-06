
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import UserHome from "@/components/user-dashboard/UserHome";
import UserBookings from "@/components/user-dashboard/UserBookings";
import UserMessages from "@/components/user-dashboard/UserMessages";
import UserNotifications from "@/components/user-dashboard/UserNotifications";
import UserMatches from "@/components/user-dashboard/UserMatches";
import UserSavedClasses from "@/components/user-dashboard/UserSavedClasses";
import UserProfile from "@/components/user-dashboard/UserProfile";
import UserPreferences from "@/components/user-dashboard/UserPreferences";
import UserReviews from "@/components/user-dashboard/UserReviews";
import UserWaitlist from "@/components/user-dashboard/UserWaitlist";

const UserDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/bookings" element={<UserBookings />} />
              <Route path="/messages" element={<UserMessages />} />
              <Route path="/notifications" element={<UserNotifications />} />
              <Route path="/matches" element={<UserMatches />} />
              <Route path="/saved" element={<UserSavedClasses />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/preferences" element={<UserPreferences />} />
              <Route path="/reviews" element={<UserReviews />} />
              <Route path="/waitlist" element={<UserWaitlist />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;
