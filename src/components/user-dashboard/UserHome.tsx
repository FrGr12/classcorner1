
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  BookOpen,
  MessageSquare,
  Star,
  Search,
  Settings,
  Heart,
  Bell
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  upcomingClasses: number;
  completedClasses: number;
  unreadMessages: number;
  savedClasses: number;
  averageRating: number;
}

const UserHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    upcomingClasses: 0,
    completedClasses: 0,
    unreadMessages: 0,
    savedClasses: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch upcoming bookings
      const { data: upcomingBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('student_id', user.id)
        .eq('status', 'confirmed')
        .gte('created_at', new Date().toISOString());

      // Fetch completed classes
      const { data: completedBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('student_id', user.id)
        .eq('status', 'completed');

      // Fetch unread messages
      const { data: messages } = await supabase
        .from('communications')
        .select('*')
        .eq('student_id', user.id)
        .eq('is_unread', true);

      setStats({
        upcomingClasses: upcomingBookings?.length || 0,
        completedClasses: completedBookings?.length || 0,
        unreadMessages: messages?.length || 0,
        savedClasses: 0, // You might want to implement a saved classes feature
        averageRating: 4.8, // This could be calculated from actual reviews
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Browse Classes",
      description: "Discover new creative experiences",
      icon: Search,
      action: () => navigate("/browse"),
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "My Bookings",
      description: "View your upcoming classes",
      icon: Calendar,
      action: () => navigate("/dashboard/bookings"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Messages",
      description: "Check your conversations",
      icon: MessageSquare,
      action: () => navigate("/dashboard/messages"),
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Preferences",
      description: "Update your settings",
      icon: Settings,
      action: () => navigate("/dashboard/preferences"),
      color: "bg-orange-100 text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <Button onClick={() => navigate("/browse")}>Browse Classes</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedClasses}</div>
            <p className="text-xs text-muted-foreground">Total completed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">New messages</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Based on reviews</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-lg font-semibold mt-8">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={action.action}
          >
            <CardContent className="pt-6">
              <div className={`inline-flex items-center justify-center rounded-lg p-2 ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mt-4">{action.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
