
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number;
}

interface ClassData {
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

interface SessionData {
  id: number;
  start_time: string;
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
  const [sessions, setSessions] = useState<SessionData[]>([]);

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
      
      // Fetch session dates
      const { data: sessionData, error: sessionError } = await supabase
        .from('course_sessions')
        .select('id, start_time')
        .eq('course_id', classId)
        .order('start_time', { ascending: true });

      if (sessionError) throw sessionError;

      if (classData) {
        setFormData(classData);
      }
      if (sessionData) {
        setSessions(sessionData);
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
      const { error } = await supabase
        .from('courses')
        .update({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          price: formData.price,
          duration: formData.duration,
          max_participants: formData.max_participants,
          category: formData.category,
          learning_objectives: formData.learning_objectives,
          materials_included: formData.materials_included,
          setup_instructions: formData.setup_instructions
        })
        .eq('id', classId);

      if (error) throw error;

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
        .update({ status: 'cancelled' })
        .eq('id', classId);

      if (error) throw error;
      toast.success("Class cancelled successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to cancel class");
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                min={0}
                step={0.01}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 2 hours"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: Number(e.target.value) })}
                required
                min={1}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Class Sessions</Label>
            <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
              {sessions.map((session) => (
                <div key={session.id} className="flex justify-between items-center">
                  <span>{format(new Date(session.start_time), 'PPp')}</span>
                </div>
              ))}
            </div>
          </div>

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
