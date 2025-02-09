
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
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, DollarSign, Users, Map, Image as ImageIcon, Calendar } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Create New Class</h1>
          <p className="text-muted-foreground mt-1">
            Share your expertise with the world
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-class-form"
            className="gap-2 bg-accent-purple hover:bg-accent-purple/90"
          >
            <BookOpen className="w-4 h-4" />
            Create Class
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <Form {...form}>
        <form id="create-class-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Class Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter an engaging title for your class" 
                          className="h-11"
                          {...field} 
                        />
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
                      <FormLabel className="text-base">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what students will learn and experience"
                          className="min-h-[120px] resize-none"
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Map className="w-5 h-5 text-accent-purple" />
                  <h3 className="text-lg font-medium">Location & Category</h3>
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cooking, Art, Music" {...field} />
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
                        <Input placeholder="Enter class location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-accent-purple" />
                  <h3 className="text-lg font-medium">Pricing & Capacity</h3>
                </div>

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Person</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
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
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-accent-purple" />
                <h3 className="text-lg font-medium">Class Images</h3>
                <p className="text-sm text-muted-foreground ml-auto">
                  Upload up to 5 images
                </p>
              </div>
              <ImageUpload
                images={images}
                setImages={setImages}
                className="mt-4"
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-accent-purple" />
                <h3 className="text-lg font-medium">Session Schedule</h3>
              </div>
              <SessionManagement
                form={form}
                sessions={sessions}
                setSessions={setSessions}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CreateClass;
