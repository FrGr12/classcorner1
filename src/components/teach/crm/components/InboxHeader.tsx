
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Library, Plus } from "lucide-react";

interface InboxHeaderProps {
  onComposeClick: () => void;
}

export const InboxHeader = ({ onComposeClick }: InboxHeaderProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your communications with students
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 text-sm"
          >
            <Library className="mr-2 h-4 w-4" />
            Templates
          </Button>
          <Button 
            className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm"
            onClick={onComposeClick}
          >
            <Plus className="mr-2 h-4 w-4" />
            Write Message
          </Button>
        </div>
      </div>
    </Card>
  );
};
