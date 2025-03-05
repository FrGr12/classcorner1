
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserDashboardHeader from "@/components/user-dashboard/UserDashboardHeader";

const StudentDashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <UserDashboardHeader />
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
