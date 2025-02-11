
import { FC, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface UpcomingClass {
  id: number;
  title: string;
  date: Date;
  participants: number;
  maxParticipants: number;
  city: string;
  status: string;
}

const BookingsOverview: FC = () => {
  const navigate = useNavigate();
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingClasses();
  }, []);

  const fetchUpcomingClasses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          location,
          max_participants,
          course_sessions (
            start_time
          ),
          bookings (
            id,
            status
          )
        `)
        .eq('instructor_id', user.id)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const formattedClasses = data.map(course => ({
        id: course.id,
        title: course.title,
        date: new Date(course.course_sessions[0]?.start_time),
        participants: course.bookings.filter(b => b.status === 'confirmed').length,
        maxParticipants: course.max_participants,
        city: course.location,
        status: 'upcoming'
      }));

      setUpcomingClasses(formattedClasses);
    } catch (error) {
      console.error('Error fetching upcoming classes:', error);
      toast.error("Failed to load upcoming classes");
    } finally {
      setLoading(false);
    }
  };

  const getOccupancyRate = (participants: number, maxParticipants: number) => {
    return Math.round((participants / maxParticipants) * 100);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Latest Bookings</h3>
            <Button 
              variant="ghost"
              size="sm"
              className="text-accent-purple"
              onClick={() => navigate("/dashboard/bookings")}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Loading upcoming classes...</p>
            </div>
          ) : upcomingClasses.length > 0 ? (
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div 
                  key={classItem.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-left">{classItem.title}</h4>
                      <p className="text-sm text-muted-foreground">{classItem.city}</p>
                    </div>
                    <Badge variant={classItem.status === 'upcoming' ? 'secondary' : 'default'}>
                      {classItem.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{classItem.date.toLocaleDateString()} at {classItem.date.toLocaleTimeString()}</span>
                      <span>{classItem.participants}/{classItem.maxParticipants} participants</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Class Capacity</span>
                        <Badge variant={
                          getOccupancyRate(classItem.participants, classItem.maxParticipants) >= 90 
                            ? "destructive" 
                            : getOccupancyRate(classItem.participants, classItem.maxParticipants) >= 70 
                              ? "secondary" 
                              : "default"
                        }>
                          {getOccupancyRate(classItem.participants, classItem.maxParticipants)}%
                        </Badge>
                      </div>
                      <Progress 
                        value={getOccupancyRate(classItem.participants, classItem.maxParticipants)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">No upcoming classes to display</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsOverview;

