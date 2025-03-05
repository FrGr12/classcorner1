
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CommunityHeaderProps {
  onNewPostClick: () => void;
}

export const CommunityHeader = ({ onNewPostClick }: CommunityHeaderProps) => {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-[42px]">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1 text-left truncate">Community</h1>
            <p className="sm:text-sm lg:text-base text-muted-foreground text-left text-sm">
              Connect with fellow crafters, share experiences, and learn together
            </p>
          </div>
          <Button 
            className="bg-accent-purple hover:bg-accent-purple/90 text-white"
            onClick={onNewPostClick}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>
    </div>
  );
};
