
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ClassItem } from "@/types/class";

interface EditClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassItem;
}

export const EditClassDialog = ({ isOpen, onClose, classData }: EditClassDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: classData.title,
    // Add other form fields here
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("User not authenticated");
      }

      // Convert duration to string if required by API
      const updatedData = {
        instructor_id: userData.user.id,
        title: formData.title,
        description: classData.description || "",
        category: classData.category || "",
        location: classData.city || "",
        address: "",
        city: classData.city || "",
        is_online: false,
        capacity: classData.maxParticipants || 10,
        price: classData.price || 0,
        duration: String(classData.duration || "60"), // Convert to string
        sessions: [],
        learning_outcomes: [],
        requirements: [],
        items_to_bring: [],
        status: "published" as const
      };

      const { error } = await supabase
        .from('courses')
        .update(updatedData)
        .eq('id', classData.id);

      if (error) throw error;
      
      toast({
        title: "Class updated",
        description: "Your class has been successfully updated."
      });
      
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update class",
        description: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Form fields would go here */}
          <p>Edit class form fields for: {formData.title}</p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button onClick={onClose}>Cancel</button>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Class"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
