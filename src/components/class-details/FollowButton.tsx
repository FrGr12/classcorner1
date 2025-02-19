
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserMinus } from "lucide-react";

interface FollowButtonProps {
  instructor: {
    name: string;
    avatar: string;
  };
  isFollowing: boolean;
  onToggleFollow: () => void;
  isLoading?: boolean;
}

const FollowButton = ({ 
  instructor,
  isFollowing,
  onToggleFollow,
  isLoading = false
}: FollowButtonProps) => {
  return (
    <Button
      variant={isFollowing ? "default" : "outline"}
      onClick={onToggleFollow}
      disabled={isLoading}
      className="gap-2"
    >
      {isFollowing ? (
        <>
          <UserMinus className="h-4 w-4" />
          <Badge variant="secondary" className="font-normal">
            Following
          </Badge>
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
};

export default FollowButton;
