
import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "@/components/user-dashboard/UserDashboardSidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

const UserDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <UserDashboardSidebar />
        <main className="flex-1 p-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;
