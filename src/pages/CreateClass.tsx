
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/teach/ImageUpload";
import SessionManagement from "@/components/teach/course-form/SessionManagement";
import FormWrapper from "@/components/teach/course-form/FormWrapper";
import { Session } from "@/types/session";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  maxParticipants: z.coerce.number().min(1, "Must allow at least 1 participant"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
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
    <div className="container max-w-4xl py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create New Class</h1>
        <p className="text-muted-foreground">
          Set up your new class and start accepting bookings
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormWrapper
            title="Basic Information"
            description="General information about your class"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter class title" {...field} />
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
                      placeholder="Describe your class"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Select category" {...field} />
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
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormWrapper>

          <FormWrapper
            title="Class Images"
            description="Upload images showcasing your class"
          >
            <ImageUpload
              images={images}
              setImages={setImages}
              className="mt-4"
            />
          </FormWrapper>

          <FormWrapper
            title="Session & Pricing"
            description="Set up your class schedule and pricing"
          >
            <SessionManagement
              form={form}
              sessions={sessions}
              setSessions={setSessions}
            />
          </FormWrapper>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Class</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateClass;
