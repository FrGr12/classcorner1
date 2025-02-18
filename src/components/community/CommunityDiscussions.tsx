
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";

const CommunityDiscussions = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            className="pl-10"
          />
        </div>
        <Button className="bg-accent-purple hover:bg-accent-purple/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <p className="text-muted-foreground">No discussions yet</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussions;
