
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDemoMode } from "@/contexts/DemoModeContext";

const StudentDashboardLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDemoMode } = useDemoMode();

  useEffect(() => {
    console.log("StudentDashboardLayout - Demo mode status:", isDemoMode);
    
    // Skip authentication check if in demo mode
    if (isDemoMode) {
      console.log("Demo mode active in dashboard, skipping auth check");
      return;
    }
    
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to access the dashboard",
        });
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate, toast, isDemoMode]);

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardHeader />
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
