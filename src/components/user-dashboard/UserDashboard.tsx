
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import UserDashboardSidebar from "./UserDashboardSidebar";

const UserDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
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
