import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const TeacherClasses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("courses")
          .select(`
            *,
            course_sessions (
              start_time
            ),
            course_images (
              image_path
            )
          `)
          .eq("instructor_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getNextSession = (sessions) => {
    if (!sessions || sessions.length === 0) return null;
    const futureSessions = sessions
      .map(s => new Date(s.start_time))
      .filter(date => date > new Date())
      .sort((a, b) => a - b);
    return futureSessions[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Classes</h1>
        <Button onClick={() => navigate("/teach/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.course_images?.[0] && (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/course-images/${course.course_images[0].image_path}`}
                    alt="Class preview"
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                )}
                <div className="space-y-2">
                  {getNextSession(course.course_sessions) && (
                    <p className="text-sm text-muted-foreground">
                      Next session: {format(getNextSession(course.course_sessions), "MMM d, yyyy")}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Status: {course.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/teach/edit/${course.id}`)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/class/${course.category}/${course.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;