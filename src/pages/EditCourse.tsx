import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import EditCourseForm from "@/components/teach/EditCourseForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error("You must be logged in to edit courses");
          navigate("/auth");
          return;
        }

        const { data: course, error } = await supabase
          .from("courses")
          .select("instructor_id")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (!course) {
          toast.error("Course not found");
          navigate("/teach/dashboard");
          return;
        }

        if (course.instructor_id !== user.id) {
          toast.error("You don't have permission to edit this course");
          navigate("/teach/dashboard");
          return;
        }

        setHasAccess(true);
      } catch (error) {
        console.error("Error checking access:", error);
        toast.error("Failed to verify access");
        navigate("/teach/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
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

  if (!hasAccess) return null;

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
            <EditCourseForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditCourse;