
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Session } from "@/types/session";
import { supabase } from "@/integrations/supabase/client";
import BasicInfoSection from "@/components/teach/course-form/BasicInfoSection";
import LocationCategorySection from "@/components/teach/course-form/LocationCategorySection";
import PricingCapacitySection from "@/components/teach/course-form/PricingCapacitySection";
import BringItemsSection from "@/components/teach/course-form/BringItemsSection";
import LearningOutcomesSection from "@/components/teach/course-form/LearningOutcomesSection";
import ImagesSection from "@/components/teach/course-form/ImagesSection";
import LocationCategoryDetailsSection from "@/components/teach/course-form/LocationCategoryDetailsSection";
import CreateClassHeader from "@/components/teach/create-class/CreateClassHeader";
import CreateClassActions from "@/components/teach/create-class/CreateClassActions";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  minParticipants: z.coerce.number().min(0, "Minimum participants must be 0 or greater"),
  maxParticipants: z.coerce.number().min(0, "Maximum participants must be 0 or greater"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().optional(),
  time: z.string().optional(),
  whatToBring: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof formSchema>;

const DuplicateClass = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftCount, setDraftCount] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      minParticipants: 0,
      maxParticipants: 0,
      location: "",
      category: "",
      whatToBring: [],
      learningOutcomes: [],
    },
    mode: "onChange"
  });

  useEffect(() => {
    const fetchDraftCount = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { count } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('instructor_id', userData.user.id)
        .eq('status', 'draft');

      if (count !== null) {
        setDraftCount(count);
      }
    };

    fetchDraftCount();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!userData.user) {
        toast.error("You must be logged in to create a class");
        return;
      }

      // Insert course data
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: data.title,
          description: data.description,
          price: data.price,
          max_participants: data.maxParticipants,
          location: data.location,
          category: data.category,
          instructor_id: userData.user.id,
          what_to_bring: data.whatToBring,
          learning_outcomes: data.learningOutcomes,
          status: 'published'
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Insert sessions
      if (sessions.length > 0) {
        const formattedSessions = sessions.map(session => ({
          course_id: course.id,
          start_time: session.start.toISOString(),
          is_recurring: session.isRecurring,
          recurrence_pattern: session.recurrencePattern,
          recurrence_end_date: session.recurrenceEndDate?.toISOString(),
          recurrence_count: session.recurrenceCount
        }));

        const { error: sessionsError } = await supabase
          .from('course_sessions')
          .insert(formattedSessions);

        if (sessionsError) throw sessionsError;
      }

      // Upload images if any
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const fileExt = image.name.split('.').pop();
          const filePath = `${course.id}/${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('course-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          // Insert image reference
          const { error: imageError } = await supabase
            .from('course_images')
            .insert({
              course_id: course.id,
              image_path: filePath,
              display_order: i
            });

          if (imageError) throw imageError;
        }
      }

      toast.success("Class published successfully!");
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to create class. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = async () => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();
      
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!userData.user) {
        toast.error("You must be logged in to save a draft");
        return;
      }

      const { error: courseError } = await supabase
        .from('courses')
        .insert({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          max_participants: formData.maxParticipants,
          location: formData.location,
          category: formData.category,
          instructor_id: userData.user.id,
          what_to_bring: formData.whatToBring,
          learning_outcomes: formData.learningOutcomes,
          status: 'draft'
        });

      if (courseError) throw courseError;

      toast.success("Class saved as draft");
      setDraftCount(prev => prev + 1);
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CreateClassHeader draftCount={draftCount} isSubmitting={isSubmitting} />

      <Form {...form}>
        <form id="create-class-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-left">Basic Information</h2>
            <BasicInfoSection form={form} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-left">What to Bring and Learning Outcomes</h2>
            <div className="space-y-6">
              <BringItemsSection form={form} />
              <LearningOutcomesSection form={form} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-left">Location & Category</h2>
            <LocationCategorySection form={form} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-left">Pricing & Capacity</h2>
            <PricingCapacitySection form={form} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-left">Add Images</h2>
            <ImagesSection images={images} setImages={setImages} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-left">Add Sessions</h2>
            <p className="text-muted-foreground mb-6 text-left">Schedule individual sessions or set up recurring classes (weekly, bi-weekly, or monthly)</p>
            <LocationCategoryDetailsSection form={form} />
          </Card>

          <CreateClassActions
            isSubmitting={isSubmitting}
            onSaveDraft={saveDraft}
            isValid={form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  );
};

export default DuplicateClass;
