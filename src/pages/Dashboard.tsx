
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherBookings from "@/components/teach/dashboard/TeacherBookings";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import CreateClass from "@/pages/CreateClass";
import DuplicateClass from "@/pages/DuplicateClass";
import NotificationsCenter from "@/components/notifications/NotificationCenter";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Routes>
              <Route index element={<TeacherOverview />} />
              <Route path="/profile" element={<TeacherProfile />} />
              <Route path="/bookings" element={<TeacherBookings />} />
              <Route path="/classes" element={<TeacherClasses />} />
              <Route path="/create-class" element={<CreateClass />} />
              <Route path="/duplicate-class" element={<DuplicateClass />} />
              <Route path="/analytics" element={<TeacherAnalytics />} />
              <Route path="/reviews" element={<TeacherReviews />} />
              <Route path="/notifications" element={
                <Card className="p-4 md:p-6">
                  <NotificationsCenter limit={20} />
                </Card>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
