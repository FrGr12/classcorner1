
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Tags } from "lucide-react";

const ContactsHeader = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your student contacts and interactions
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 text-sm"
          >
            <Tags className="mr-2 h-4 w-4" />
            Manage Tags
          </Button>
          <Button 
            className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContactsHeader;
