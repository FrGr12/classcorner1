
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
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

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Fetch courses to check if any exist
      const { data: courses } = await supabase
        .from('courses')
        .select('id')
        .eq('instructor_id', user.id);

      // Fetch metrics
      const { data: metrics } = await supabase
        .from('teacher_engagement_metrics')
        .select('*')
        .eq('instructor_id', user.id)
        .single();

      // Update onboarding steps
      setOnboardingSteps({
        profileComplete: !!(profileData?.bio && profileData?.avatar_url),
        firstClassCreated: courses && courses.length > 0
      });

      // Update stats using the correct metric fields
      setStats({
        totalStudents: metrics?.total_students || 0,
        upcomingClasses: metrics?.attended_students || 0, // Changed to use attended_students instead of total_classes
        averageRating: metrics?.avg_rating || 0
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
      <div className="flex items-center justify-between">
        <WelcomeHeader fullName={profile?.full_name} />
        <Button onClick={() => navigate("/dashboard/classes")} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Class
        </Button>
      </div>

      <OnboardingAlert steps={onboardingSteps} />
      <TeacherStats stats={stats} />
      <NotificationsCard />
    </div>
  );
};

export default TeacherOverview;
