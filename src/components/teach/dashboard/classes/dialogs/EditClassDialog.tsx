
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { ClassItem } from '@/types/class';
import { handleError } from '@/utils/errorHandler';
import { useToast } from '@/hooks/use-toast';

interface EditClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassItem;
}

export const EditClassDialog: React.FC<EditClassDialogProps> = ({ isOpen, onClose, classData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: classData.title,
      description: classData.description,
      category: classData.category || '',
      location: classData.city,
      // Ensure duration is set as a string
      duration: typeof classData.duration === 'number' ? String(classData.duration) : classData.duration || '60',
      price: classData.price,
      capacity: classData.maxParticipants || 10,
      status: 'published'
    }
  });

  useEffect(() => {
    if (classData) {
      setValue('title', classData.title);
      setValue('description', classData.description);
      setValue('category', classData.category || '');
      setValue('location', classData.city);
      setValue('duration', typeof classData.duration === 'number' ? String(classData.duration) : classData.duration || '60');
      setValue('price', classData.price);
      setValue('capacity', classData.maxParticipants || 10);
    }
  }, [classData, setValue]);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Prepare the data for the update operation
      const updateData = {
        instructor_id: classData.instructor_id,
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        address: classData.city,
        city: data.location,
        is_online: false,
        capacity: data.capacity,
        price: data.price,
        duration: String(data.duration), // Ensure duration is stored as string
        learning_outcomes: classData.learning_outcomes || [],
        requirements: classData.requirements || [],
        items_to_bring: classData.items_to_bring || [],
        status: "published"
      };

      const { error } = await supabase
        .from('courses')
        .update(updateData)
        .eq('id', classData.id);
      
      if (error) throw error;
      
      toast({
        title: "Class updated",
        description: "Your changes have been saved successfully.",
      });
      
      onClose();
    } catch (error) {
      handleError(error, {
        title: "Update failed",
        description: "There was a problem updating the class. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title', { required: true })} />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description', { required: true })} />
            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue('category', value)} defaultValue={classData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pottery">Pottery</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
                <SelectItem value="crafts">Crafts</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register('location', { required: true })} />
            {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              {...register('duration', { required: true })}
            />
            {errors.duration && <p className="text-red-500 text-sm">Duration is required</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register('price', { required: true, min: 0 })}
            />
            {errors.price && <p className="text-red-500 text-sm">Price is required and must be a positive number</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Maximum Capacity</Label>
            <Input
              id="capacity"
              type="number"
              {...register('capacity', { required: true, min: 1 })}
            />
            {errors.capacity && <p className="text-red-500 text-sm">Capacity is required and must be at least 1</p>}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
