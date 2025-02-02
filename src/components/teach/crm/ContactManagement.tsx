import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter } from "lucide-react";

interface ContactManagementProps {
  onContactSelect: (id: string) => void;
  selectedContactId: string | null;
}

const ContactManagement = ({ onContactSelect, selectedContactId }: ContactManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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
          )
        `)
        .textSearch('search_text', searchTerm)
        .eq("user_type", "student");

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {contacts?.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              selectedContactId === contact.id
                ? "bg-primary/10"
                : "hover:bg-muted/50"
            }`}
            onClick={() => onContactSelect(contact.id)}
          >
            <Avatar>
              <AvatarImage src={contact.avatar_url || ""} />
              <AvatarFallback>
                {contact.first_name?.[0]}
                {contact.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">
                  {contact.first_name} {contact.last_name}
                </p>
                {contact.contact_tag_assignments?.map((assignment: any) => (
                  <Badge
                    key={assignment.contact_tags.id}
                    variant="outline"
                    style={{
                      backgroundColor: `${assignment.contact_tags.status_color}20`,
                      borderColor: assignment.contact_tags.status_color,
                      color: assignment.contact_tags.status_color,
                    }}
                  >
                    {assignment.contact_tags.name}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {contact.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactManagement;