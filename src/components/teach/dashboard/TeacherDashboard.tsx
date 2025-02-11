import { Outlet } from "react-router-dom";
import TeacherDashboardSidebar from "./TeacherDashboardSidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

const TeacherDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <TeacherDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;