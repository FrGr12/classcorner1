import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import UserDashboardOverview from "@/components/user-dashboard/UserDashboardOverview";
import UserMessages from "@/components/user-dashboard/UserMessages";
import UserBookings from "@/components/user-dashboard/UserBookings";
import UserNotifications from "@/components/user-dashboard/UserNotifications";
import UserMatches from "@/components/user-dashboard/UserMatches";
import UserSavedClasses from "@/components/user-dashboard/UserSavedClasses";
import UserProfile from "@/components/user-dashboard/UserProfile";
import UserReviews from "@/components/user-dashboard/UserReviews";
import { SidebarProvider } from "@/contexts/SidebarContext";

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Routes>
              <Route index element={<UserDashboardOverview />} />
              <Route path="messages" element={<UserMessages />} />
              <Route path="bookings" element={<UserBookings />} />
              <Route path="notifications" element={<UserNotifications />} />
              <Route path="matches" element={<UserMatches />} />
              <Route path="saved" element={<UserSavedClasses />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="reviews" element={<UserReviews />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;