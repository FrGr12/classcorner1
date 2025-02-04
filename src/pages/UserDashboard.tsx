
import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

const UserDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserDashboardSidebar />
        <div className="flex-1 bg-gray-50">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;
