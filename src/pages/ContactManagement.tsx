import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import TagManagement from "@/components/teach/contacts/TagManagement";

const ContactManagement = () => {
  const location = useLocation();
  const isTagsPage = location.pathname.includes('/tags');

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isTagsPage ? 'Manage Tags' : 'Add Contact'}
      </h1>
      <p className="text-muted-foreground mb-6">
        {isTagsPage 
          ? 'Organize your contacts with custom tags' 
          : 'Add a new contact to your network'}
      </p>
      
      {isTagsPage ? (
        <TagManagement />
      ) : (
        <div className="space-y-6">
          {/* Contact Form UI will be implemented here */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            Contact form interface coming soon
          </div>
        </div>
      )}
    </Card>
  );
};

export default ContactManagement;
