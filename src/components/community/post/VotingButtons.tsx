
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

interface VotingButtonsProps {
  votes: number;
  userVote: number;
  onVote: (value: number) => void;
}

export function VotingButtons({ votes, userVote, onVote }: VotingButtonsProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={userVote === 1 ? "text-accent-purple" : ""}
        onClick={() => onVote(userVote === 1 ? 0 : 1)}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">{votes}</span>
      <Button
        variant="ghost"
        size="sm"
        className={userVote === -1 ? "text-accent-purple" : ""}
        onClick={() => onVote(userVote === -1 ? 0 : -1)}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
