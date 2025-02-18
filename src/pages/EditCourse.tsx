
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import EditCourseForm from "@/components/teach/EditCourseForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseId = Number(id);
        if (isNaN(courseId)) {
          setError("Invalid course ID provided");
          navigate("/dashboard/classes");
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError("You must be logged in to edit a course");
          navigate("/auth");
          return;
        }

        const { data, error } = await supabase
          .from("courses")
          .select(`
            *,
            course_sessions (
              start_time
            )
          `)
          .eq("id", courseId)
          .eq("instructor_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError("Course not found or you don't have permission to edit it");
          navigate("/dashboard/classes");
          return;
        }

        setCourse(data);
      } catch (error: any) {
        console.error("Error fetching course:", error);
        setError(error.message || "Failed to load course");
        toast.error("Failed to load course");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="pt-32 pb-16 container-padding">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent-purple" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="pt-32 pb-16 container-padding">
          <div className="max-w-7xl mx-auto">
            <Alert variant="destructive" className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="pt-32 pb-16 container-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="heading-lg mb-4">Edit Course</h1>
          <p className="text-neutral-600 mb-8">
            Update your course details and schedule.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <EditCourseForm initialData={course} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditCourse;
