import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Bell,
  MessageSquare,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeacherOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    upcomingClasses: 0,
    unreadMessages: 0,
    pendingReviews: 0,
    totalRevenue: 0,
    averageRating: 0
  });
  const [onboardingSteps, setOnboardingSteps] = useState({
    profileComplete: false,
    firstClassCreated: false,
    preferencesSet: false
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

      // Fetch engagement metrics
      const { data: metrics } = await supabase
        .from('teacher_engagement_metrics')
        .select('*')
        .eq('instructor_id', user.id)
        .single();

      // Update onboarding steps
      setOnboardingSteps({
        profileComplete: !!(profileData?.bio && profileData?.avatar_url),
        firstClassCreated: courses && courses.length > 0,
        preferencesSet: true // You might want to add a preferences check here
      });

      // Update stats
      setStats({
        totalStudents: metrics?.total_students || 0,
        upcomingClasses: 0, // You'll need to implement this count
        unreadMessages: 0, // You'll need to implement this count
        pendingReviews: 0, // You'll need to implement this count
        totalRevenue: 0, // You'll need to implement this calculation
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
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <Button onClick={() => navigate("/teach/new")}>Create New Class</Button>
      </div>

      {/* Onboarding Progress */}
      {(!onboardingSteps.profileComplete || !onboardingSteps.firstClassCreated) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Welcome to your teaching journey!</AlertTitle>
          <AlertDescription>
            Complete these steps to get started:
            <div className="mt-2 space-y-2">
              {!onboardingSteps.profileComplete && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 1</Badge>
                  <span>Complete your profile</span>
                  <Button variant="link" onClick={() => navigate("/teach/profile")}>
                    Update Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              {!onboardingSteps.firstClassCreated && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step 2</Badge>
                  <span>Create your first class</span>
                  <Button variant="link" onClick={() => navigate("/teach/new")}>
                    Create Class <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all your classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Based on student feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Center and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <NotificationCenter />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/teach/new")}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Create New Class
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/teach/messages")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Students
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate("/teach/analytics")}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherOverview;
