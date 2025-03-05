
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Library, Plus } from "lucide-react";

interface InboxHeaderProps {
  onComposeClick: () => void;
}

export const InboxHeader = ({ onComposeClick }: InboxHeaderProps) => {
  return (
    <Card className="p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Manage your communications with students
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button 
            variant="outline"
            className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 text-xs px-2 sm:px-3 sm:text-sm h-8 sm:h-10"
          >
            <Library className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Templates</span>
            <span className="sm:hidden">Temp.</span>
          </Button>
          <Button 
            className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs px-2 sm:px-3 sm:text-sm h-8 sm:h-10"
            onClick={onComposeClick}
          >
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Write Message</span>
            <span className="sm:hidden">Write</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
