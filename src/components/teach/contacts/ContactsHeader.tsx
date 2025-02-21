
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Tags } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactsHeader = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your student contacts and interactions
          </p>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <Button 
              variant="default"
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm mb-2 w-full"
              onClick={() => navigate("/dashboard/contacts/tags")}
            >
              <Tags className="mr-2 h-4 w-4 text-white" />
              Manage Tags
            </Button>
            <p className="text-xs text-muted-foreground">
              Organize your contacts
            </p>
          </div>
          <div className="text-center">
            <Button 
              variant="default"
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm mb-2 w-full"
              onClick={() => navigate("/dashboard/contacts/add")}
            >
              <Plus className="mr-2 h-4 w-4 text-white" />
              Add Contact
            </Button>
            <p className="text-xs text-muted-foreground">
              Create new contact
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactsHeader;
