
import { Routes, Route } from "react-router-dom";
import TeacherDashboardSidebar from "./TeacherDashboardSidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import TeacherOverview from "./TeacherOverview";
import TeacherClasses from "./TeacherClasses";
import TeacherStats from "./TeacherStats";
import TeacherMessages from "./TeacherMessages";
import TeacherWaitlist from "./TeacherWaitlist";
import TeacherSettings from "./TeacherSettings";

const TeacherDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <TeacherDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Routes>
              <Route index element={<TeacherOverview />} />
              <Route path="classes/*" element={<TeacherClasses />} />
              <Route path="messages" element={<TeacherMessages />} />
              <Route path="waitlist" element={<TeacherWaitlist />} />
              <Route path="stats" element={<TeacherStats />} />
              <Route path="settings" element={<TeacherSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;
