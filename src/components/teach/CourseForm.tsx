import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ImageUpload from "./ImageUpload";
import SessionsForm from "./SessionsForm";
import BookingSettings from "./course-form/BookingSettings";
import BasicInformation from "./course-form/BasicInformation";
import CourseDetails from "./course-form/CourseDetails";
import { Session } from "@/types/session";

interface CourseFormProps {
  courseId?: string;
  mode?: 'create' | 'edit';
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  maxParticipants: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    {
      message: "Maximum participants must be a positive number",
    }
  ),
  learningObjectives: z.string().min(10, "Learning objectives are required"),
  materialsIncluded: z.string().min(10, "Materials included are required"),
  setupInstructions: z.string().min(10, "Setup instructions are required"),
  duration: z.string().min(1, "Duration is required"),
  groupBookingsEnabled: z.boolean().default(false),
  privateBookingsEnabled: z.boolean().default(false),
  basePriceGroup: z.string().optional(),
  basePricePrivate: z.string().optional(),
  minGroupSize: z.string().optional(),
  maxGroupSize: z.string().optional(),
  paymentTiming: z.enum(["instant", "post_course"]).default("instant"),
});

const CourseForm = ({ courseId, mode = 'create' }: CourseFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      category: "",
      maxParticipants: "",
      learningObjectives: "",
      materialsIncluded: "",
      setupInstructions: "",
      duration: "",
      groupBookingsEnabled: false,
      privateBookingsEnabled: false,
      paymentTiming: "instant",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      toast.loading(mode === 'create' ? "Creating your course..." : "Updating your course...");

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to create a course");
        return;
      }

      if (mode === 'create') {
        const { data: course, error: courseError } = await supabase
          .from("courses")
          .insert({
            title: values.title,
            description: values.description,
            price: Number(values.price),
            location: values.location,
            category: values.category,
            max_participants: Number(values.maxParticipants),
            instructor_id: user.id,
            status: "draft",
            learning_objectives: values.learningObjectives,
            materials_included: values.materialsIncluded,
            setup_instructions: values.setupInstructions,
            duration: values.duration,
            group_bookings_enabled: values.groupBookingsEnabled,
            private_bookings_enabled: values.privateBookingsEnabled,
            base_price_group: values.basePriceGroup ? Number(values.basePriceGroup) : null,
            base_price_private: values.basePricePrivate ? Number(values.basePricePrivate) : null,
            min_group_size: values.minGroupSize ? Number(values.minGroupSize) : null,
            max_group_size: values.maxGroupSize ? Number(values.maxGroupSize) : null,
            payment_timing: values.paymentTiming,
          })
          .select()
          .single();

        if (courseError) throw courseError;

        // Upload images
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `${user.id}/${course.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("course-images")
            .upload(filePath, file);

          if (uploadError) {
            toast.error(`Failed to upload image ${i + 1}`);
            throw uploadError;
          }

          const { error: imageError } = await supabase
            .from("course_images")
            .insert({
              course_id: course.id,
              image_path: filePath,
              display_order: i,
            });

          if (imageError) throw imageError;
        }

        // Insert sessions
        for (const session of sessions) {
          const { error: sessionError } = await supabase
            .from("course_sessions")
            .insert({
              course_id: course.id,
              start_time: session.start.toISOString(),
              is_recurring: session.isRecurring,
              recurrence_pattern: session.recurrencePattern,
              recurrence_end_date: session.recurrenceEndDate?.toISOString(),
              recurrence_count: session.recurrenceCount,
            });

          if (sessionError) {
            toast.error("Failed to create some sessions");
            throw sessionError;
          }
        }

        toast.success("Course created successfully!");
        navigate(`/class/${values.category}/${course.id}`);
      } else {
        const { error: courseError } = await supabase
          .from("courses")
          .update({
            title: values.title,
            description: values.description,
            price: Number(values.price),
            location: values.location,
            category: values.category,
            max_participants: Number(values.maxParticipants),
            learning_objectives: values.learningObjectives,
            materials_included: values.materialsIncluded,
            setup_instructions: values.setupInstructions,
            duration: values.duration,
            group_bookings_enabled: values.groupBookingsEnabled,
            private_bookings_enabled: values.privateBookingsEnabled,
            base_price_group: values.basePriceGroup ? Number(values.basePriceGroup) : null,
            base_price_private: values.basePricePrivate ? Number(values.basePricePrivate) : null,
            min_group_size: values.minGroupSize ? Number(values.minGroupSize) : null,
            max_group_size: values.maxGroupSize ? Number(values.maxGroupSize) : null,
            payment_timing: values.paymentTiming,
          })
          .eq('id', Number(courseId));

        if (courseError) throw courseError;

        // Upload new images
        if (images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const fileExt = file.name.split(".").pop();
            const filePath = `${user.id}/${courseId}/${crypto.randomUUID()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
              .from("course-images")
              .upload(filePath, file);

            if (uploadError) {
              toast.error(`Failed to upload image ${i + 1}`);
              throw uploadError;
            }

            const { error: imageError } = await supabase
              .from("course_images")
              .insert({
                course_id: Number(courseId),
                image_path: filePath,
                display_order: i,
              });

            if (imageError) throw imageError;
          }
        }

        // Update sessions
        const { error: deleteSessionsError } = await supabase
          .from("course_sessions")
          .delete()
          .eq("course_id", Number(courseId));

        if (deleteSessionsError) throw deleteSessionsError;

        for (const session of sessions) {
          const { error: sessionError } = await supabase
            .from("course_sessions")
            .insert({
              course_id: Number(courseId),
              start_time: session.start.toISOString(),
              is_recurring: session.isRecurring,
              recurrence_pattern: session.recurrencePattern,
              recurrence_end_date: session.recurrenceEndDate?.toISOString(),
              recurrence_count: session.recurrenceCount,
            });

          if (sessionError) {
            toast.error("Failed to update some sessions");
            throw sessionError;
          }
        }

        toast.success("Course updated successfully!");
        navigate(`/class/${values.category}/${courseId}`);
      }
    } catch (error) {
      console.error("Error with course:", error);
      toast.error(mode === 'create' ? "Failed to create course" : "Failed to update course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Start with the fundamental details of your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BasicInformation form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
            <CardDescription>
              Configure your course sessions and capacity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Price (per person)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Participants</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter max participants" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SessionsForm sessions={sessions} setSessions={setSessions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Options</CardTitle>
            <CardDescription>
              Configure how students can book your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingSettings form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>
              Provide detailed information about your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CourseDetails form={form} />
          </CardContent>
        </Card>

        <ImageUpload images={images} setImages={setImages} />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === 'create' ? "Creating Course..." : "Updating Course..."}
            </>
          ) : (
            mode === 'create' ? "Create Course" : "Update Course"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CourseForm;
