
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import BasicInfoSection from "./form-sections/BasicInfoSection";
import PricingSection from "./form-sections/PricingSection";
import LocationSection from "./form-sections/LocationSection";
import ScheduleSection from "./form-sections/ScheduleSection";
import ImagesSection from "./form-sections/ImagesSection";

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number;
}

export interface ClassData {
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  max_participants: number;
  category: string;
  learning_objectives: string;
  materials_included: string;
  setup_instructions: string;
  status: string;
}

const EditClassDialog = ({ open, onOpenChange, classId }: EditClassDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<ClassData>({
    title: "",
    description: "",
    location: "",
    price: 0,
    duration: "",
    max_participants: 1,
    category: "",
    learning_objectives: "",
    materials_included: "",
    setup_instructions: "",
    status: "draft"
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [sessionDate, setSessionDate] = useState<string>("");

  useEffect(() => {
    if (open && classId) {
      fetchClassData();
    }
  }, [open, classId]);

  const fetchClassData = async () => {
    try {
      setIsFetching(true);
      
      // Fetch class details
      const { data: classData, error: classError } = await supabase
        .from('courses')
        .select(`
          title,
          description,
          location,
          price,
          duration,
          max_participants,
          category,
          learning_objectives,
          materials_included,
          setup_instructions,
          status
        `)
        .eq('id', classId)
        .single();

      if (classError) throw classError;

      // Fetch the first session date
      const { data: sessionData, error: sessionError } = await supabase
        .from('course_sessions')
        .select('start_time')
        .eq('course_id', classId)
        .order('start_time', { ascending: true })
        .limit(1)
        .single();

      if (sessionError && sessionError.code !== 'PGRST116') throw sessionError;

      // Fetch existing images
      const { data: imageData, error: imageError } = await supabase
        .from('course_images')
        .select('image_path')
        .eq('course_id', classId)
        .order('display_order', { ascending: true });

      if (imageError) throw imageError;

      if (classData) {
        setFormData(classData);
      }
      if (sessionData) {
        setSessionDate(format(new Date(sessionData.start_time), "yyyy-MM-dd'T'HH:mm"));
      }
      if (imageData) {
        setExistingImages(imageData.map(img => img.image_path));
      }
    } catch (error) {
      console.error('Error fetching class data:', error);
      toast.error("Failed to load class data");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: courseError } = await supabase
        .from('courses')
        .update({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          price: formData.price,
          duration: formData.duration,
          category: formData.category,
        })
        .eq('id', classId);

      if (courseError) throw courseError;

      // Update session date if changed
      if (sessionDate) {
        const { error: sessionError } = await supabase
          .from('course_sessions')
          .update({ start_time: sessionDate })
          .eq('course_id', classId);

        if (sessionError) throw sessionError;
      }

      // Handle new image uploads if any
      if (images.length > 0) {
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${classId}/${Math.random()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('class-images')
            .upload(fileName, image);

          if (uploadError) throw uploadError;

          const { error: imageError } = await supabase
            .from('course_images')
            .insert({
              course_id: classId,
              image_path: fileName,
              display_order: existingImages.length
            });

          if (imageError) throw imageError;
        }
      }

      toast.success("Class updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update class");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status: 'archived' })
        .eq('id', classId);

      if (error) throw error;
      toast.success("Class archived successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to archive class");
    }
  };

  if (isFetching) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <BasicInfoSection formData={formData} setFormData={setFormData} />
          <PricingSection formData={formData} setFormData={setFormData} />
          <LocationSection formData={formData} setFormData={setFormData} />
          <ScheduleSection sessionDate={sessionDate} setSessionDate={setSessionDate} />
          <ImagesSection images={images} setImages={setImages} />

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel Class
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Close
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
                className="bg-accent-purple hover:bg-accent-purple/90"
              >
                {isLoading ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default EditClassDialog;
