
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CourseForm from "@/components/teach/CourseForm";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherProfile from "@/components/teach/dashboard/TeacherProfile";
import TeacherCRM from "@/components/teach/dashboard/TeacherCRM";
import TeacherBookings from "@/components/teach/dashboard/TeacherBookings";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<TeacherOverview />} />
              <Route path="/create-class" element={<CourseForm />} />
              <Route path="/profile" element={<TeacherProfile />} />
              <Route path="/crm" element={<TeacherCRM />} />
              <Route path="/bookings" element={<TeacherBookings />} />
              <Route path="/classes" element={<TeacherClasses />} />
              <Route path="/analytics" element={<TeacherAnalytics />} />
              <Route path="/reviews" element={<TeacherReviews />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
