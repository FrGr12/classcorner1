
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ClassItem } from '@/types/class';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EditClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassItem;
  onSuccess: () => void;
}

// Create the form schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  is_online: z.boolean().default(false),
  capacity: z.number().int().positive().default(1),
  price: z.number().nonnegative().default(0),
  duration: z.string().default("60"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export const EditClassDialog: React.FC<EditClassDialogProps> = ({
  isOpen,
  onClose,
  classData,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: classData.title,
      description: classData.description,
      category: classData.category,
      location: classData.location,
      address: classData.address || '',
      city: classData.city || '',
      is_online: classData.is_online,
      capacity: classData.capacity,
      price: classData.price,
      duration: String(classData.duration),
      status: classData.status as "draft" | "published" | "archived",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const courseData = {
        instructor_id: classData.instructor_id,
        title: values.title,
        description: values.description,
        category: values.category,
        location: values.location,
        address: values.address,
        city: values.city,
        is_online: values.is_online,
        capacity: values.capacity,
        price: values.price,
        duration: values.duration,
        status: values.status,
      };

      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', classData.id);

      if (error) throw error;

      toast({
        title: 'Class updated',
        description: 'Your class information has been updated.',
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating class:', error);
      toast({
        title: 'Error',
        description: 'Failed to update class. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Update your class details. Click save when you're finished.
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
                    <Textarea {...field} />
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
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
