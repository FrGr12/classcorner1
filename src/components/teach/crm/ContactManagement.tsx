import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Filter, Mail, Phone } from "lucide-react";
import ContactProfileView from "./ContactProfileView";
import BulkMessageComposer from "./BulkMessageComposer";

const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [showBulkMessage, setShowBulkMessage] = useState(false);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          contact_tag_assignments(
            contact_tags(
              name,
              color,
              status_color
            )
          ),
          communications(
            id,
            is_unread
          )
        `)
        .textSearch('search_text', searchTerm)
        .eq("user_type", "student");

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          onClick={() => setShowBulkMessage(true)}
          className="ml-4"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Bulk Message
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
          <CardDescription>
            Manage your student contacts and interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {contacts?.map((contact) => {
                const unreadMessages = contact.communications?.filter(c => c.is_unread)?.length || 0;
                const tags = contact.contact_tag_assignments?.map(ta => ta.contact_tags) || [];
                
                return (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedContact(contact.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar_url || ""} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {contact.first_name?.[0]}
                          {contact.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">
                          {contact.first_name} {contact.last_name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {contact.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {contact.email}
                            </span>
                          )}
                          {contact.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {contact.phone}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              style={{
                                backgroundColor: `${tag.status_color}20` || '#f1f5f9',
                                borderColor: tag.status_color || '#e2e8f0',
                                color: tag.status_color || 'inherit'
                              }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {unreadMessages > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {unreadMessages} unread
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <ContactProfileView
              contactId={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={showBulkMessage}
        onOpenChange={setShowBulkMessage}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Bulk Message</DialogTitle>
          </DialogHeader>
          <BulkMessageComposer />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManagement;