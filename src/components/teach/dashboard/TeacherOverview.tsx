
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import {
  Users,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

      // Update stats
      setStats({
        totalStudents: metrics?.total_students || 0,
        upcomingClasses: metrics?.upcoming_classes || 0,
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
        <div>
          <h1 className="text-2xl font-bold">Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!</h1>
          <p className="text-muted-foreground mt-1">Here's an overview of your teaching activities</p>
        </div>
        <Button onClick={() => navigate("/dashboard/classes")} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Class
        </Button>
      </div>

      {/* Onboarding Progress */}
      {(!onboardingSteps.profileComplete || !onboardingSteps.firstClassCreated) && (
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-700">Complete Your Teaching Profile</AlertTitle>
          <AlertDescription className="text-blue-600">
            <div className="mt-2 space-y-3">
              {!onboardingSteps.profileComplete && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Step 1
                  </Badge>
                  <span>Complete your profile</span>
                  <Button variant="link" onClick={() => navigate("/dashboard/profile")} className="text-blue-600">
                    Update Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              {!onboardingSteps.firstClassCreated && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Step 2
                  </Badge>
                  <span>Create your first class</span>
                  <Button variant="link" onClick={() => navigate("/dashboard/classes")} className="text-blue-600">
                    Create Class <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled in your classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
            <p className="text-xs text-muted-foreground">Scheduled this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">From student reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationCenter />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherOverview;
