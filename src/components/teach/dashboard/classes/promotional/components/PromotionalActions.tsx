
import { Button } from "@/components/ui/button";
import { Rocket, ArrowUp, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PromotionalActionsProps {
  onBoost: () => void;
  onSponsor: () => void;
  onOutreach: () => void;
}

const PromotionalActions = ({
  onBoost,
  onSponsor,
  onOutreach
}: PromotionalActionsProps) => {
  const { data: credits } = useQuery({
    queryKey: ['teacherCredits'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: teacherFeatures, error } = await supabase
        .from('teacher_premium_features')
        .select('boost_credits')
        .eq('teacher_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return teacherFeatures?.boost_credits ?? 0;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={onBoost} 
          className="gap-2 bg-accent-purple"
          disabled={credits === 0}
        >
          <Rocket className="h-4 w-4" />
          Boost
        </Button>
        <Button 
          onClick={onSponsor} 
          className="gap-2 bg-accent-purple"
          disabled={credits === 0}
        >
          <ArrowUp className="h-4 w-4" />
          Sponsor
        </Button>
        <Button 
          onClick={onOutreach} 
          className="gap-2 bg-accent-purple"
          disabled={credits === 0}
        >
          <MessageSquare className="h-4 w-4" />
          Outreach
        </Button>
      </div>
      {credits === 0 && (
        <p className="text-sm text-muted-foreground">
          You need credits to use promotional features. Purchase credits above to get started.
        </p>
      )}
    </div>
  );
};

export default PromotionalActions;
