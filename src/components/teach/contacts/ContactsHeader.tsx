
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Tags } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Manage your student contacts and interactions
          </p>
        </div>
        <div className="flex gap-2 sm:gap-6">
          <div className="flex-1 sm:text-center">
            <Button 
              variant="default" 
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10 w-full"
              onClick={() => navigate("/dashboard/contacts/tags")}
            >
              <Tags className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="whitespace-nowrap">Manage Tags</span>
            </Button>
          </div>
          <div className="flex-1 sm:text-center">
            <Button 
              variant="default" 
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10 w-full"
              onClick={() => navigate("/dashboard/contacts/add")}
            >
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="whitespace-nowrap">Add Contact</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactsHeader;
