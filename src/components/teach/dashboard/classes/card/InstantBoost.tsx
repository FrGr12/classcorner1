
import { useState } from "react";
import { Rocket, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InstantBoostProps {
  courseId: number;
}

const InstantBoost = ({ courseId }: InstantBoostProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBoost = async () => {
    try {
      setIsLoading(true);

      // Check boost credits
      const { data: premiumFeatures, error: creditsError } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .single();

      if (creditsError) throw creditsError;

      if (!premiumFeatures || premiumFeatures.boost_credits <= 0) {
        toast.error("No boost credits remaining");
        return;
      }

      // Create boost record
      const { error: boostError } = await supabase
        .from('course_boosts')
        .insert({
          course_id: courseId,
          boost_type: 'instant',
          start_time: new Date().toISOString(),
          end_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          status: 'active'
        });

      if (boostError) throw boostError;

      // Deduct credit
      const { error: updateError } = await supabase
        .from('teacher_premium_features')
        .update({ 
          boost_credits: premiumFeatures.boost_credits - 1 
        })
        .eq('teacher_id', (await supabase.auth.getUser()).data.user?.id);

      if (updateError) throw updateError;

      toast.success("Boost activated successfully!");
    } catch (error) {
      console.error('Error activating boost:', error);
      toast.error("Failed to activate boost");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Rocket className="h-4 w-4 mr-2" />
          Boost Class Visibility
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Activate Boost
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will use 1 boost credit to increase your visibility for the next 24 hours. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBoost}
            disabled={isLoading}
          >
            {isLoading ? "Activating..." : "Activate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InstantBoost;
