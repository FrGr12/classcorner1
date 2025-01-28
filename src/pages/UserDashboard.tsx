import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { SidebarProvider } from "@/components/ui/sidebar";

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
        <div className="flex-1">
          <main className="p-6">
            <UserDashboardOverview />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserMessages />
              <UserBookings />
              <UserNotifications />
              <UserMatches />
              <UserSavedClasses />
              <UserProfile />
              <UserReviews />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;