
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
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

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
  onSuccess?: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  maxParticipants: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Maximum participants must be a positive number",
  }),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

const EditClassDialog = ({ open, onOpenChange, classId, onSuccess }: EditClassDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const loadClassDetails = async () => {
    if (!classId) return;

    try {
      setLoading(true);
      const { data: course, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_sessions (
            start_time
          )
        `)
        .eq('id', classId)
        .single();

      if (error) throw error;

      if (course) {
        const startTime = course.course_sessions?.[0]?.start_time;
        const date = startTime ? new Date(startTime) : new Date();

        form.reset({
          title: course.title,
          description: course.description,
          price: course.price.toString(),
          maxParticipants: course.max_participants?.toString() || "",
          date: date.toISOString().split('T')[0],
          time: date.toTimeString().slice(0, 5),
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load class details");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!classId) return;

    try {
      setLoading(true);

      // Combine date and time
      const dateTime = new Date(`${values.date}T${values.time}`);

      // Update course details
      const { error: courseError } = await supabase
        .from('courses')
        .update({
          title: values.title,
          description: values.description,
          price: Number(values.price),
          max_participants: Number(values.maxParticipants),
        })
        .eq('id', classId);

      if (courseError) throw courseError;

      // Update session timing
      const { error: sessionError } = await supabase
        .from('course_sessions')
        .update({
          start_time: dateTime.toISOString(),
        })
        .eq('course_id', classId);

      if (sessionError) throw sessionError;

      toast.success("Class updated successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update class");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCourse = async () => {
    if (!classId) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('courses')
        .update({
          status: 'archived' // Changed from 'cancelled' to 'archived'
        })
        .eq('id', classId);

      if (error) throw error;

      toast.success("Course cancelled successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel course");
    } finally {
      setLoading(false);
      setShowCancelDialog(false);
    }
  };

  // Load class details when dialog opens
  useState(() => {
    if (open && classId) {
      loadClassDetails();
    }
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update class details or manage scheduling
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Textarea {...field} className="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
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
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowCancelDialog(true)}
                  disabled={loading}
                >
                  Cancel Course
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={loading}
                  >
                    Close
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will cancel the course and notify all registered participants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
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

export default EditClassDialog;
