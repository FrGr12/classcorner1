
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateClassSchema } from '@/lib/validators/create-class';
import { ClassItem } from '@/types/class';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassItem;
  onSuccess?: () => void;
}

export const EditClassDialog: React.FC<EditClassDialogProps> = ({ isOpen, onClose, classData, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      title: classData.title || '',
      description: classData.description || '',
      category: classData.category || '',
      location: classData.city || '',
      address: '',
      city: classData.city || '',
      is_online: false,
      capacity: classData.maxParticipants || 1,
      price: classData.price || 0,
      duration: typeof classData.duration === 'number' ? String(classData.duration) : classData.duration || '60',
      learning_outcomes: classData.learning_outcomes || [''],
      requirements: classData.requirements || [''],
      items_to_bring: classData.items_to_bring || [''],
      status: (classData.status as "draft" | "published" | "archived") || 'published',
    }
  });
  
  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      
      const formattedData = {
        instructor_id: userData.user.id,
        title: values.title,
        description: values.description,
        category: values.category,
        location: values.location,
        address: values.address,
        city: values.city,
        is_online: values.is_online,
        capacity: values.capacity,
        price: values.price,
        duration: String(values.duration), // Ensure duration is stored as string
        learning_outcomes: values.learning_outcomes,
        requirements: values.requirements,
        items_to_bring: values.items_to_bring,
        status: values.status as "draft" | "published" | "archived",
      };
      
      const { error } = await supabase
        .from('courses')
        .update(formattedData)
        .eq('id', classData.id);
        
      if (error) throw error;
      
      toast({
        title: 'Class updated',
        description: 'Your changes have been saved.',
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error updating class',
        description: error.message || 'An error occurred while updating the class',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                  <Textarea {...field} className="min-h-32" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      min="0" 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))} 
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
                      {...field} 
                      type="number" 
                      min="1" 
                      onChange={(e) => field.onChange(parseInt(e.target.value))} 
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
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
