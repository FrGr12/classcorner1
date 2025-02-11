
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeacherOverview from "@/components/teach/dashboard/TeacherOverview";
import TeacherInbox from "@/components/teach/crm/TeacherInbox";
import CreateClass from "@/pages/CreateClass";
import TeacherProfile from "@/pages/TeacherProfile";
import TeacherContacts from "@/pages/TeacherContacts";
import TeacherClasses from "@/components/teach/dashboard/TeacherClasses";

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
              <Route path="/create-class" element={<CreateClass />} />
              <Route path="/inbox" element={<TeacherInbox />} />
              <Route path="/contacts" element={<TeacherContacts />} />
              <Route path="/profile" element={<TeacherProfile />} />
              <Route path="/classes" element={<TeacherClasses />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
