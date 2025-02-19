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
  groupBookingsEnabled: z.boolean().default(false),
  privateBookingsEnabled: z.boolean().default(false),
  basePriceGroup: z.coerce.number().optional(),
  basePricePrivate: z.coerce.number().optional(),
  minGroupSize: z.coerce.number().optional(),
  maxGroupSize: z.coerce.number().optional(),
  minParticipants: z.coerce.number().min(0, "Minimum participants must be 0 or greater"),
  maxParticipants: z.coerce.number().min(0, "Maximum participants must be 0 or greater"),
  waitlistEnabled: z.boolean().default(false),
  maxWaitlistSize: z.coerce.number().optional(),
  autoPromoteFromWaitlist: z.boolean().default(false),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  schedule: z.array(z.object({
    date: z.string(),
    time: z.string(),
    duration: z.string(),
    isRecurring: z.boolean(),
    recurrencePattern: z.string().optional(),
    recurrenceEndDate: z.string().optional()
  })).min(1, "At least one session is required"),
  whatToBring: z.array(z.string()).default([]),
  materialsProvided: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  cancellationPolicy: z.string().optional(),
  paymentTiming: z.string().optional(),
  skillLevel: z.string().default("beginner"),
  classFormat: z.string().default("in_person"),
  classRequirements: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  setupInstructions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateClass = () => {
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
      minParticipants: 1,
      maxParticipants: 10,
      location: "",
      category: "",
      whatToBring: [],
      learningOutcomes: [],
      materialsProvided: [],
      prerequisites: [],
      groupBookingsEnabled: false,
      privateBookingsEnabled: false,
      waitlistEnabled: false,
      skillLevel: "beginner",
      classFormat: "in_person",
      classRequirements: [],
      targetAudience: [],
      schedule: [],
    },
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

      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: data.title,
          description: data.description,
          price: data.price,
          min_participants: data.minParticipants,
          max_participants: data.maxParticipants,
          location: data.location,
          category: data.category,
          instructor_id: userData.user.id,
          what_to_bring: data.whatToBring,
          materials_provided: data.materialsProvided,
          prerequisites: data.prerequisites,
          learning_outcomes: data.learningOutcomes,
          group_bookings_enabled: data.groupBookingsEnabled,
          private_bookings_enabled: data.privateBookingsEnabled,
          base_price_group: data.basePriceGroup,
          base_price_private: data.basePricePrivate,
          min_group_size: data.minGroupSize,
          max_group_size: data.maxGroupSize,
          waitlist_enabled: data.waitlistEnabled,
          max_waitlist_size: data.maxWaitlistSize,
          auto_promote_from_waitlist: data.autoPromoteFromWaitlist,
          cancellation_policy: data.cancellationPolicy,
          payment_timing: data.paymentTiming,
          skill_level: data.skillLevel,
          class_format: data.classFormat,
          class_requirements: data.classRequirements,
          target_audience: data.targetAudience,
          setup_instructions: data.setupInstructions,
          status: 'published'
        })
        .select()
        .single();

      if (courseError) throw courseError;

      if (data.schedule.length > 0) {
        const formattedSessions = data.schedule.map(session => ({
          course_id: course.id,
          start_time: new Date(`${session.date}T${session.time}`).toISOString(),
          is_recurring: session.isRecurring,
          recurrence_pattern: session.recurrencePattern,
          recurrence_end_date: session.recurrenceEndDate ? new Date(session.recurrenceEndDate).toISOString() : null
        }));

        const { error: sessionsError } = await supabase
          .from('course_sessions')
          .insert(formattedSessions);

        if (sessionsError) throw sessionsError;
      }

      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const fileExt = image.name.split('.').pop();
          const filePath = `${course.id}/${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('course-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

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

      toast.success("Class created successfully!");
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
          title: formData.title || '',
          description: formData.description || '',
          price: formData.price || 0,
          min_participants: formData.minParticipants,
          max_participants: formData.maxParticipants,
          location: formData.location || '',
          category: formData.category || '',
          instructor_id: userData.user.id,
          what_to_bring: formData.whatToBring,
          materials_provided: formData.materialsProvided,
          prerequisites: formData.prerequisites,
          learning_outcomes: formData.learningOutcomes,
          group_bookings_enabled: formData.groupBookingsEnabled,
          private_bookings_enabled: formData.privateBookingsEnabled,
          base_price_group: formData.basePriceGroup,
          base_price_private: formData.basePricePrivate,
          min_group_size: formData.minGroupSize,
          max_group_size: formData.maxGroupSize,
          waitlist_enabled: formData.waitlistEnabled,
          max_waitlist_size: formData.maxWaitlistSize,
          auto_promote_from_waitlist: formData.autoPromoteFromWaitlist,
          cancellation_policy: formData.cancellationPolicy,
          payment_timing: formData.paymentTiming,
          skill_level: formData.skillLevel,
          class_format: formData.classFormat,
          class_requirements: formData.classRequirements,
          target_audience: formData.targetAudience,
          setup_instructions: formData.setupInstructions,
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
    <div className="space-y-8">
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
            <h2 className="text-xl font-semibold mb-6 text-left">Schedule & Sessions</h2>
            <LocationCategoryDetailsSection form={form} />
          </Card>

          <CreateClassActions isSubmitting={isSubmitting} onSaveDraft={saveDraft} />
        </form>
      </Form>
    </div>
  );
};

export default CreateClass;
