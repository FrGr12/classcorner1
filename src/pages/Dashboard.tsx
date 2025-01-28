import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CourseForm from "@/components/teach/CourseForm";
import PerformanceMetrics from "@/components/teach/analytics/PerformanceMetrics";
import EngagementMetrics from "@/components/teach/analytics/EngagementMetrics";
import MatchInsights from "@/components/teach/crm/MatchInsights";
import Communications from "@/components/teach/crm/Communications";
import CourseMatches from "@/components/teach/crm/CourseMatches";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <EngagementMetrics />
                      <PerformanceMetrics />
                    </div>
                    <MatchInsights />
                    <Communications />
                    <CourseMatches />
                  </div>
                }
              />
              <Route path="/create-course" element={<CourseForm />} />
              <Route path="/analytics" element={
                <div className="space-y-8">
                  <PerformanceMetrics />
                  <EngagementMetrics />
                </div>
              } />
              <Route path="/communications" element={<Communications />} />
              <Route path="/matches" element={<CourseMatches />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;