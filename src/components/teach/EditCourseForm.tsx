import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data: course, error } = await supabase
          .from("courses")
          .select(`
            *,
            course_sessions (
              *
            ),
            course_images (
              image_path
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;

        if (course) {
          form.reset({
            title: course.title,
            description: course.description,
            category: course.category,
            location: course.location,
            price: course.price.toString(),
            maxParticipants: course.max_participants?.toString() || "",
            learningObjectives: course.learning_objectives || "",
            materialsIncluded: course.materials_included || "",
            setupInstructions: course.setup_instructions || "",
            duration: "2 hours", // You might want to add this to your database
            groupBookingsEnabled: course.group_bookings_enabled || false,
            privateBookingsEnabled: course.private_bookings_enabled || false,
            basePriceGroup: course.base_price_group?.toString(),
            basePricePrivate: course.base_price_private?.toString(),
            minGroupSize: course.min_group_size?.toString(),
            maxGroupSize: course.max_group_size?.toString(),
            paymentTiming: course.payment_timing || "instant",
          });

          if (course.course_sessions) {
            setSessions(course.course_sessions.map(session => ({
              start: new Date(session.start_time),
              isRecurring: session.is_recurring || false,
              recurrencePattern: session.recurrence_pattern,
              recurrenceEndDate: session.recurrence_end_date ? new Date(session.recurrence_end_date) : undefined,
              recurrenceCount: session.recurrence_count,
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course details");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to update a course");
        return;
      }

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
          group_bookings_enabled: values.groupBookingsEnabled,
          private_bookings_enabled: values.privateBookingsEnabled,
          base_price_group: values.basePriceGroup ? Number(values.basePriceGroup) : null,
          base_price_private: values.basePricePrivate ? Number(values.basePricePrivate) : null,
          min_group_size: values.minGroupSize ? Number(values.minGroupSize) : null,
          max_group_size: values.maxGroupSize ? Number(values.maxGroupSize) : null,
          payment_timing: values.paymentTiming,
        })
        .eq('id', id);

      if (courseError) throw courseError;

      // Upload new images
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `${user.id}/${id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("course-images")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { error: imageError } = await supabase
            .from("course_images")
            .insert({
              course_id: id,
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
        .eq("course_id", id);

      if (deleteSessionsError) throw deleteSessionsError;

      for (const session of sessions) {
        const { error: sessionError } = await supabase
          .from("course_sessions")
          .insert({
            course_id: id,
            start_time: session.start.toISOString(),
            is_recurring: session.isRecurring,
            recurrence_pattern: session.recurrencePattern,
            recurrence_end_date: session.recurrenceEndDate?.toISOString(),
            recurrence_count: session.recurrenceCount,
          });

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

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInformation form={form} />
        <SessionsForm sessions={sessions} setSessions={setSessions} />
        <BookingSettings form={form} />
        <CourseDetails form={form} />
        <ImageUpload images={images} setImages={setImages} />

        <Button
          type="submit"
          className="w-full"
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
      </form>
    </Form>
  );
};

export default EditCourseForm;