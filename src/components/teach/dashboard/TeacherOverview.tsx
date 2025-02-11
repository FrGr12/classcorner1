
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
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    upcomingClasses: 0,
    totalRevenue: 0,
    averageRating: 0
  });

  useEffect(() => {
    fetchTeacherMetrics();
  }, []);

  const fetchTeacherMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: metricsData, error } = await supabase
        .from('teacher_metrics')
        .select('*')
        .eq('instructor_id', user.id)
        .single();

      if (error) throw error;

      setMetrics({
        totalStudents: metricsData?.total_students || 0,
        upcomingClasses: metricsData?.upcoming_classes || 0,
        totalRevenue: metricsData?.total_revenue || 0,
        averageRating: metricsData?.avg_rating || 0
      });

    } catch (error: any) {
      console.error('Error fetching metrics:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard metrics"
      });
    }
  };

  return (
    <div className="space-y-8">
      <DashboardMetrics metrics={metrics} />
      
      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Messages & Notifications</h2>
        <MessagesOverview />
      </section>

      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <DashboardActions />
      </section>

      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Classes</h2>
        <BookingsOverview />
      </section>

      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-4">Analytics Summary</h2>
        <AnalyticsSummary />
      </section>
    </div>
  );
};

export default TeacherOverview;

