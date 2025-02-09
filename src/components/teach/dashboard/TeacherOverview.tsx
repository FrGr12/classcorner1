
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WelcomeHeader from "./overview/WelcomeHeader";
import TeacherStats from "./overview/TeacherStats";
import NotificationsCard from "./overview/NotificationsCard";

const TeacherOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    upcomingClasses: 0,
    averageRating: 0
  });

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile and metrics in parallel
      const [profileResponse, coursesResponse, metricsResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('courses').select('id').eq('instructor_id', user.id),
        supabase.from('teacher_engagement_metrics').select('*').eq('instructor_id', user.id).single()
      ]);

      setProfile(profileResponse.data);
      
      setStats({
        totalStudents: metricsResponse.data?.total_students || 0,
        upcomingClasses: metricsResponse.data?.attended_students || 0,
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
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
        <WelcomeHeader fullName={profile?.full_name} />
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/dashboard/notifications")} className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button onClick={() => navigate("/dashboard/classes")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Class
          </Button>
        </div>
      </div>

      <NotificationsCard />

      <div className="grid gap-6 md:grid-cols-[1fr]">
        <div className="space-y-6">
          <TeacherStats stats={stats} />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm mt-8 w-full">
        <h3 className="font-semibold mb-6 text-lg">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Button 
            variant="secondary" 
            size="lg"
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
            onClick={() => navigate("/dashboard/profile")}
          >
            Complete Your Profile
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
            onClick={() => navigate("/dashboard/classes")}
          >
            Manage Classes
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
            onClick={() => navigate("/dashboard/messages")}
          >
            Check Messages
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
            onClick={() => navigate("/dashboard/reviews")}
          >
            View Reviews
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white"
            onClick={() => navigate("/dashboard/analytics")}
          >
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;

