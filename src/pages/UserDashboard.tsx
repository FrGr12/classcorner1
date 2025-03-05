
import { Routes, Route } from "react-router-dom";
import UserDashboardHeader from "@/components/user-dashboard/UserDashboardHeader";
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";
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
import { Breadcrumbs, useBreadcrumbs } from "@/components/navigation/Breadcrumbs";

// Check if we're in a preview environment
const isPreviewMode = window.location.hostname.includes('stackblitz') || 
                     window.location.hostname.includes('codesandbox') ||
                     window.location.hostname.includes('vercel.app') ||
                     window.location.hostname.includes('netlify.app');

// In preview mode, automatically enable admin mode if not already set
if (isPreviewMode && localStorage.getItem("admin_mode") !== "true") {
  localStorage.setItem("admin_mode", "true");
  console.log("Preview mode detected in UserDashboard, admin mode enabled automatically");
}

const UserDashboard = () => {
  const breadcrumbs = useBreadcrumbs();
  
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <UserDashboardHeader />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} showHome={false} />
          
          <Routes>
            <Route index element={<UserDashboardOverview />} />
            <Route path="overview" element={<UserDashboardOverview />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="messages" element={<UserMessages />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="matches" element={<UserMatches />} />
            <Route path="saved" element={<UserSavedClasses />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="preferences" element={<UserPreferences />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="waitlist" element={<UserWaitlist />} />
            <Route path="payments" element={<UserPayments />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
