
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PostVotingProps {
  votes: number;
  onVoteChange?: (newVote: number) => void;
}

const PostVoting = ({ votes, onVoteChange }: PostVotingProps) => {
  const [userVote, setUserVote] = useState<number>(0);

  const handleVote = (voteValue: number) => {
    const newVote = userVote === voteValue ? 0 : voteValue;
    setUserVote(newVote);
    if (onVoteChange) {
      onVoteChange(newVote);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className={userVote === 1 ? "text-accent-purple" : ""} 
        onClick={() => handleVote(1)}
        aria-label="Upvote post"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">{votes}</span>
      <Button 
        variant="ghost" 
        size="sm" 
        className={userVote === -1 ? "text-accent-purple" : ""} 
        onClick={() => handleVote(-1)}
        aria-label="Downvote post"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PostVoting;
