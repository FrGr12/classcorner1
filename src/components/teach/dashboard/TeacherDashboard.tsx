import { Routes, Route } from "react-router-dom";
import TeacherDashboardSidebar from "./TeacherDashboardSidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import TeacherStats from "./TeacherStats";

const TeacherDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <TeacherDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Routes>
              <Route path="stats" element={<TeacherStats />} />
              <Route path="*" element={<div>Other routes go here</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;
