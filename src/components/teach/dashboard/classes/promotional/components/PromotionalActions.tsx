import { Button } from "@/components/ui/button";
import { Rocket, ArrowUp, MessageSquare } from "lucide-react";
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
  return <div className="flex gap-2">
      <Button onClick={onBoost} className="gap-2 bg-accent-purple">
        <Rocket className="h-4 w-4" />
        Boost
      </Button>
      <Button onClick={onSponsor} className="gap-2 bg-accent-purple">
        <ArrowUp className="h-4 w-4" />
        Sponsor
      </Button>
      <Button onClick={onOutreach} className="gap-2 bg-accent-purple">
        <MessageSquare className="h-4 w-4" />
        Outreach
      </Button>
    </div>;
};
export default PromotionalActions;