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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Tag, MessageSquare, Phone, Mail } from "lucide-react";
import ContactNotes from "./ContactNotes";
import ContactTags from "./ContactTags";

interface Contact {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  tags?: { name: string; color: string }[];
}

const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
              color
            )
          )
        `)
        .eq("user_type", "student");

      if (error) throw error;

      return data.map((contact) => ({
        ...contact,
        tags: contact.contact_tag_assignments?.map(
          (assignment: any) => assignment.contact_tags
        ),
      })) as Contact[];
    },
  });

  const filteredContacts = contacts?.filter((contact) => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Management</CardTitle>
        <CardDescription>
          Manage your student contacts and interactions
        </CardDescription>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {filteredContacts?.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={contact.avatar_url || ""} />
                    <AvatarFallback>
                      {contact.first_name?.[0]}
                      {contact.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {contact.first_name} {contact.last_name}
                    </h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
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
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {contact.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      style={{
                        backgroundColor: tag.color + "20",
                        borderColor: tag.color,
                      }}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Dialog
          open={!!selectedContact}
          onOpenChange={(open) => !open && setSelectedContact(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedContact.avatar_url || ""} />
                      <AvatarFallback>
                        {selectedContact.first_name?.[0]}
                        {selectedContact.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedContact.first_name} {selectedContact.last_name}
                      </h2>
                      <div className="flex gap-4 text-muted-foreground">
                        {selectedContact.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {selectedContact.email}
                          </span>
                        )}
                        {selectedContact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {selectedContact.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Tag className="h-4 w-4 mr-2" />
                      Manage Tags
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="notes">
                  <ContactNotes contactId={selectedContact.id} />
                </TabsContent>
                <TabsContent value="tags">
                  <ContactTags contactId={selectedContact.id} />
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContactManagement;