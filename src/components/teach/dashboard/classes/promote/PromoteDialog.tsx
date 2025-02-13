
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Tag } from "lucide-react";
import CreateDiscountDialog from "../discounts/CreateDiscountDialog";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
}

const PromoteDialog = ({ open, onOpenChange, classId }: PromoteDialogProps) => {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [boostCredits, setBoostCredits] = useState(0);
  const [isBoostLoading, setIsBoostLoading] = useState(false);

  useEffect(() => {
    const fetchBoostCredits = async () => {
      // First get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Then fetch their premium features using teacher_id
      const { data, error } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .eq('teacher_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setBoostCredits(data.boost_credits);
      } else {
        console.error('Error fetching boost credits:', error);
        // Set to 0 if no premium features found
        setBoostCredits(0);
      }
    };

    if (open) {
      fetchBoostCredits();
    }
  }, [open]);

  const handleBoost = async () => {
    if (!classId) return;
    
    setIsBoostLoading(true);
    try {
      // First check if there's an active boost
      const { data: existingBoost } = await supabase
        .from('course_boosts')
        .select('*')
        .eq('course_id', classId)
        .eq('status', 'active')
        .maybeSingle();

      if (existingBoost) {
        toast.error("This class already has an active boost");
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to boost your class");
        return;
      }

      // Check boost credits
      const { data: premiumFeatures } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .eq('teacher_id', user.id)
        .single();

      if (!premiumFeatures || premiumFeatures.boost_credits <= 0) {
        toast.error("No boost credits remaining");
        return;
      }

      // Create boost record
      const { error: boostError } = await supabase
        .from('course_boosts')
        .insert({
          course_id: classId,
          boost_type: 'instant',
          start_time: new Date().toISOString(),
          end_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          status: 'active'
        });

      if (boostError) throw boostError;

      // Deduct credit
      const { error: updateError } = await supabase
        .from('teacher_premium_features')
        .update({ boost_credits: premiumFeatures.boost_credits - 1 })
        .eq('teacher_id', user.id);

      if (updateError) throw updateError;

      toast.success("Class boosted successfully!");
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error boosting class:', error);
      toast.error("Failed to boost class");
    } finally {
      setIsBoostLoading(false);
    }
  };

  const handleDiscountCreated = () => {
    setIsDiscountOpen(false);
    onOpenChange(false);
    toast.success("Discount created successfully");
  };

  if (!classId) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Promote Your Class</DialogTitle>
            <DialogDescription>
              Choose how you want to promote your class
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-20"
              onClick={() => setIsDiscountOpen(true)}
            >
              <Tag className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Create Discount</div>
                <div className="text-sm text-muted-foreground">
                  Offer special pricing to attract more students
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-start gap-2 h-20"
              onClick={handleBoost}
              disabled={isBoostLoading || boostCredits <= 0}
            >
              <Rocket className="h-5 w-5" />
              <div className="text-left flex-1">
                <div className="font-medium">Boost Visibility</div>
                <div className="text-sm text-muted-foreground">
                  Increase your class visibility in search results
                </div>
                <div className="mt-1 text-xs">
                  {boostCredits > 0 ? (
                    <span className="text-green-600">
                      {boostCredits} boost {boostCredits === 1 ? 'credit' : 'credits'} available
                    </span>
                  ) : (
                    <span className="text-amber-600">
                      No credits available - Purchase credits to boost
                    </span>
                  )}
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CreateDiscountDialog
        courseId={classId}
        open={isDiscountOpen}
        onOpenChange={setIsDiscountOpen}
        onDiscountCreated={handleDiscountCreated}
      />
    </>
  );
};

export default PromoteDialog;
