import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Clock, Package, GraduationCap, Settings } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageUpload from "./ImageUpload";
import SessionsForm from "./SessionsForm";
import { cn } from "@/lib/utils";

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
      learningObjectives: "",
      materialsIncluded: "",
      setupInstructions: "",
      duration: "",
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
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Start with the fundamental details of your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                      placeholder="Provide an engaging overview of your course"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Learning Experience
            </CardTitle>
            <CardDescription>
              Detail what students will learn and do in your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="learningObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What Students Will Learn</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List the key skills and knowledge students will gain"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Course Materials
            </CardTitle>
            <CardDescription>
              Specify what's included in the course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="materialsIncluded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's Included</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List all materials, tools, and resources provided"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Course Setup
            </CardTitle>
            <CardDescription>
              Provide setup and duration details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="setupInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setup Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What students need to prepare or bring"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Duration</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 2 hours per session, 4 weeks"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <ImageUpload images={images} setImages={setImages} />

        <SessionsForm sessions={sessions} setSessions={setSessions} />

        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <CardDescription>
              Set pricing and participation limits
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

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