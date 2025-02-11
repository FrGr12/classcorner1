
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";
import TeacherAnalytics from "@/components/teach/dashboard/TeacherAnalytics";
import TeacherReviews from "@/components/teach/dashboard/TeacherReviews";
import CreateClass from "@/pages/CreateClass";
import TeacherProfile from "@/pages/TeacherProfile";
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
              <Route path="/classes" element={<TeacherClasses />} />
              <Route path="/create-class" element={<CreateClass />} />
              <Route path="/analytics" element={<TeacherAnalytics />} />
              <Route path="/reviews" element={<TeacherReviews />} />
              <Route path="/profile" element={<TeacherProfile />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
