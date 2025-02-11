
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  maxParticipants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Maximum participants must be a positive number",
  }),
  waitlistEnabled: z.boolean().optional(),
  maxWaitlistSize: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
});

const EditCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      category: "",
      maxParticipants: "",
      waitlistEnabled: false,
      maxWaitlistSize: "",
      startDate: "",
      startTime: "",
    },
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) return;

      const { data: course, error } = await supabase
        .from("courses")
        .select(`
          *,
          course_sessions (
            start_time
          )
        `)
        .eq('id', Number(id))
        .single();

      if (error) {
        toast.error("Error fetching course details");
        return;
      }

      if (course) {
        setCurrentCourse(course);
        const startTime = course.course_sessions?.[0]?.start_time;
        const date = startTime ? new Date(startTime) : new Date();

        form.reset({
          title: course.title,
          description: course.description,
          category: course.category,
          location: course.location,
          price: course.price.toString(),
          maxParticipants: course.max_participants?.toString() || "",
          waitlistEnabled: course.waitlist_enabled || false,
          maxWaitlistSize: course.max_waitlist_size?.toString() || "",
          startDate: startTime ? date.toISOString().split('T')[0] : "",
          startTime: startTime ? date.toTimeString().slice(0, 5) : "",
        });
      }
    };

    fetchCourseDetails();
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      toast.loading("Updating your course...");

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to update a course");
        return;
      }

      // Update course details
      const { error: courseError } = await supabase
        .from("courses")
        .update({
          title: values.title,
          description: values.description,
          price: Number(values.price),
          location: values.location,
          category: values.category,
          max_participants: Number(values.maxParticipants),
          waitlist_enabled: values.waitlistEnabled,
          max_waitlist_size: values.maxWaitlistSize ? Number(values.maxWaitlistSize) : null,
        })
        .eq('id', Number(id));

      if (courseError) throw courseError;

      // Update session timing
      if (currentCourse?.course_sessions?.[0]?.id) {
        const combinedDateTime = new Date(`${values.startDate}T${values.startTime}`);
        
        const { error: sessionError } = await supabase
          .from("course_sessions")
          .update({
            start_time: combinedDateTime.toISOString(),
          })
          .eq('id', currentCourse.course_sessions[0].id);

        if (sessionError) throw sessionError;
      }

      toast.success("Course updated successfully!");
      navigate(`/class/${values.category}/${id}`);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelCourse = async () => {
    try {
      setIsLoading(true);
      
      const { error: courseError } = await supabase
        .from("courses")
        .update({
          status: 'archived' // Changed from 'cancelled' to 'archived'
        })
        .eq('id', Number(id));

      if (courseError) throw courseError;

      toast.success("Course cancelled successfully");
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error cancelling course:", error);
      toast.error("Failed to cancel course");
    } finally {
      setIsLoading(false);
      setShowCancelDialog(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register("description")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...form.register("category")} />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register("location")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" {...form.register("price")} />
              </div>

              <div>
                <Label htmlFor="maxParticipants">Maximum Participants</Label>
                <Input 
                  id="maxParticipants" 
                  type="number" 
                  {...form.register("maxParticipants")} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  {...form.register("startDate")} 
                />
              </div>

              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  {...form.register("startTime")} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="waitlistEnabled">Enable Waitlist</Label>
                <Switch 
                  id="waitlistEnabled"
                  checked={form.watch("waitlistEnabled")}
                  onCheckedChange={(checked) => form.setValue("waitlistEnabled", checked)}
                />
              </div>

              {form.watch("waitlistEnabled") && (
                <div>
                  <Label htmlFor="maxWaitlistSize">Maximum Waitlist Size</Label>
                  <Input 
                    id="maxWaitlistSize" 
                    type="number" 
                    {...form.register("maxWaitlistSize")} 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowCancelDialog(true)}
              disabled={isLoading}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Cancel Course
            </Button>

            <Button
              type="submit"
              className="bg-accent-purple hover:bg-accent-purple/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Course...
                </>
              ) : (
                "Update Course"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will cancel the course and notify all registered participants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelCourse}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, cancel course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditCourseForm;
