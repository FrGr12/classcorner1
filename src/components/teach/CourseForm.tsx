import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import SessionsForm from "./SessionsForm";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  maxParticipants: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    {
      message: "Maximum participants must be a positive number",
    }
  ),
  tags: z.string().optional(),
});

const CourseForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [sessions, setSessions] = useState<{ start: Date; end: Date }[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      category: "",
      maxParticipants: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to create a course");
        return;
      }

      // Convert tags string to array
      const tagsArray = values.tags
        ? values.tags.split(",").map((tag) => tag.trim())
        : [];

      // Insert course
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
          tags: tagsArray,
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

        if (uploadError) throw uploadError;

        // Insert image metadata
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
            end_time: session.end.toISOString(),
          });

        if (sessionError) throw sessionError;
      }

      toast.success("Course created successfully!");
      navigate(`/class/${values.category}/${course.id}`);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your course in detail. Include what students will learn, prerequisites, and what materials will be provided."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUpload images={images} setImages={setImages} />

        <SessionsForm sessions={sessions} setSessions={setSessions} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    {...field}
                  />
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
                  <Input
                    type="number"
                    placeholder="Enter max participants"
                    min="1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter course location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  {...field}
                >
                  <option value="">Select a category</option>
                  <option value="art">Art</option>
                  <option value="cooking">Cooking</option>
                  <option value="music">Music</option>
                  <option value="crafts">Crafts</option>
                  <option value="photography">Photography</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., beginner, watercolor, painting"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Course...
            </>
          ) : (
            "Create Course"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CourseForm;