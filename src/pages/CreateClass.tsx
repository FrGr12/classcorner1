
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Session } from "@/types/session";
import { Card } from "@/components/ui/card";
import BasicInfoSection from "@/components/teach/course-form/BasicInfoSection";
import LocationCategorySection from "@/components/teach/course-form/LocationCategorySection";
import PricingCapacitySection from "@/components/teach/course-form/PricingCapacitySection";
import BringItemsSection from "@/components/teach/course-form/BringItemsSection";
import LearningOutcomesSection from "@/components/teach/course-form/LearningOutcomesSection";
import ImagesSection from "@/components/teach/course-form/ImagesSection";
import ScheduleSection from "@/components/teach/course-form/ScheduleSection";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  maxParticipants: z.coerce.number().min(1, "Must allow at least 1 participant"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  whatToBring: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof formSchema>;

const CreateClass = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      maxParticipants: 1,
      location: "",
      category: "",
      whatToBring: [],
      learningOutcomes: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement class creation logic with Supabase
      toast.success("Class created successfully!");
      navigate("/dashboard/classes");
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Failed to create class. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-semibold">Create New Class</h1>
            <p className="text-muted-foreground mt-1">
              Share your expertise with the world
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit"
              form="create-class-form"
              className="bg-accent-purple hover:bg-accent-purple/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </div>
        </div>
      </Card>

      <Form {...form}>
        <form id="create-class-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <BasicInfoSection form={form} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Location & Category</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <LocationCategorySection form={form} />
              <PricingCapacitySection form={form} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Additional Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <BringItemsSection form={form} />
              <LearningOutcomesSection form={form} />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Images</h2>
            <ImagesSection images={images} setImages={setImages} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Schedule</h2>
            <ScheduleSection form={form} sessions={sessions} setSessions={setSessions} />
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CreateClass;
