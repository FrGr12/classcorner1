
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WelcomeHeader from "./overview/WelcomeHeader";
import OnboardingAlert from "./overview/OnboardingAlert";
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
  const [onboardingSteps, setOnboardingSteps] = useState({
    profileComplete: false,
    firstClassCreated: false
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
      
      setOnboardingSteps({
        profileComplete: !!(profileResponse.data?.bio && profileResponse.data?.avatar_url),
        firstClassCreated: coursesResponse.data && coursesResponse.data.length > 0
      });

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
    <div className="space-y-6">
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

      {(!onboardingSteps.profileComplete || !onboardingSteps.firstClassCreated) && (
        <OnboardingAlert steps={onboardingSteps} />
      )}

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <TeacherStats stats={stats} />
          <NotificationsCard />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/dashboard/profile")}>
                Complete Your Profile
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/dashboard/classes")}>
                Manage Classes
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/dashboard/messages")}>
                Check Messages
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/dashboard/reviews")}>
                View Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
