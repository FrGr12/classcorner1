
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardMetrics from "./overview/DashboardMetrics";
import DashboardActions from "./overview/DashboardActions";
import BookingsOverview from "./overview/BookingsOverview";
import MessagesOverview from "./overview/MessagesOverview";
import AnalyticsSummary from "./overview/AnalyticsSummary";

const TeacherOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    upcomingClasses: 0,
    totalRevenue: 0,
    averageRating: 0
  });

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileResponse, metricsResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('teacher_engagement_metrics').select('*').eq('instructor_id', user.id).single()
      ]);

      setProfile(profileResponse.data);
      
      setMetrics({
        totalStudents: metricsResponse.data?.total_students || 0,
        upcomingClasses: metricsResponse.data?.upcoming_classes || 0,
        totalRevenue: metricsResponse.data?.total_revenue || 0,
        averageRating: metricsResponse.data?.avg_rating || 0
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data"
      });
    }
  };

  return (
    <div className="space-y-8">
      <DashboardMetrics metrics={metrics} />
      
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <DashboardActions />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
          <BookingsOverview />
        </section>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Messages & Notifications</h2>
          <MessagesOverview />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Analytics Summary</h2>
          <AnalyticsSummary />
        </section>
      </div>
    </div>
  );
};

export default TeacherOverview;
