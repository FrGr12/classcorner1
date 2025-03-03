
import { useState, useCallback } from "react";
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
import { memo } from "react";

interface InstantBoostProps {
  courseId: number;
}

const InstantBoost = memo(({ courseId }: InstantBoostProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBoost = useCallback(async () => {
    try {
      setIsLoading(true);

      // Check boost credits
      const { data: premiumFeatures, error: creditsError } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .single();

      if (creditsError) throw creditsError;

      if (!premiumFeatures || premiumFeatures.boost_credits <= 0) {
        toast.error("No boost credits remaining", {
          description: "Purchase more credits to continue boosting your classes"
        });
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

      toast.success("Boost activated successfully!", {
        description: "Your class will have increased visibility for the next 24 hours"
      });
    } catch (error) {
      console.error('Error activating boost:', error);
      toast.error("Failed to activate boost", {
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-purple"
          aria-label="Boost class visibility"
        >
          <Rocket className="h-4 w-4 mr-2" aria-hidden="true" />
          Boost Class Visibility
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent 
        aria-labelledby="boost-dialog-title" 
        aria-describedby="boost-dialog-description"
      >
        <AlertDialogHeader>
          <AlertDialogTitle id="boost-dialog-title" className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            Activate Boost
          </AlertDialogTitle>
          <AlertDialogDescription id="boost-dialog-description">
            This will use 1 boost credit to increase your visibility for the next 24 hours. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBoost}
            disabled={isLoading}
            className="bg-accent-purple hover:bg-accent-purple/90"
            aria-busy={isLoading}
          >
            {isLoading ? "Activating..." : "Activate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

InstantBoost.displayName = 'InstantBoost';

export default InstantBoost;
