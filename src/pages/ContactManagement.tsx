
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const ContactManagement = () => {
  const location = useLocation();
  const isTagsPage = location.pathname.includes('/tags');

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          {isTagsPage ? 'Manage Tags' : 'Add Contact'}
        </h1>
        <p className="text-muted-foreground">
          {isTagsPage 
            ? 'Organize your contacts with custom tags' 
            : 'Add a new contact to your network'}
        </p>
        {/* Content will be implemented later */}
      </Card>
    </div>
  );
};

export default ContactManagement;
