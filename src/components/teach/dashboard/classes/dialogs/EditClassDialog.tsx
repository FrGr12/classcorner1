
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClassItem } from "@/types/class";
import { Button } from "@/components/ui/button";
import { handleError } from "@/utils/errorHandler";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EditClassFormFields from "./EditClassFormFields";

interface EditClassDialogProps {
  classData: ClassItem;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const EditClassDialog = ({ 
  classData, 
  isOpen, 
  onOpenChange,
  onSuccess 
}: EditClassDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: classData.title,
    description: classData.description,
    category: classData.category || '',
    location: classData.city,
    price: classData.price,
    capacity: classData.maxParticipants || 10,
    duration: classData.duration || "60", // Ensure duration is a string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : 
              name === 'capacity' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const updatedData = {
        instructor_id: userData.user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        address: classData.address || '',
        city: formData.location,
        is_online: classData.is_online || false,
        capacity: formData.capacity,
        price: formData.price,
        duration: String(formData.duration), // Ensure duration is stored as string
        learning_outcomes: classData.learning_outcomes || [],
        requirements: classData.requirements || [],
        items_to_bring: classData.items_to_bring || [],
        status: "published"
      };

      const { error } = await supabase
        .from('courses')
        .update(updatedData)
        .eq('id', classData.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your class has been updated.",
      });

      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      handleError(error, {
        title: "Failed to update class",
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <EditClassFormFields 
            formData={formData} 
            handleChange={handleChange} 
          />
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
