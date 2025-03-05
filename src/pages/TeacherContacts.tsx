
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ContactsTable from "@/components/teach/contacts/ContactsTable";
import ContactsHeader from "@/components/teach/contacts/ContactsHeader";
import ContactSearch from "@/components/teach/contacts/ContactSearch";
import { Contact } from "@/types/contact";

const TeacherContacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts", searchTerm, statusFilter],
    queryFn: async () => {
      // For now, return dummy data
      const dummyContacts: Contact[] = [
        {
          id: "1",
          first_name: "Emma",
          last_name: "Watson",
          email: "emma.watson@example.com",
          phone: "+46 70 123 4567",
          tags: ["Active", "VIP"],
          last_interaction: new Date().toISOString(),
          total_bookings: 5,
          average_rating: 4.8,
          location: "Stockholm",
          notes: "Interested in advanced pottery classes",
          languages: ["English", "Swedish"]
        },
        {
          id: "2",
          first_name: "James",
          last_name: "Smith",
          email: "james.smith@example.com",
          phone: "+46 70 234 5678",
          tags: ["Past Attendee"],
          last_interaction: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          total_bookings: 2,
          average_rating: 4.5,
          location: "Gothenburg",
          notes: "Prefers weekend classes",
          languages: ["English"]
        },
        {
          id: "3",
          first_name: "Sofia",
          last_name: "Andersson",
          email: "sofia.andersson@example.com",
          phone: "+46 70 345 6789",
          tags: ["Waitlist", "New"],
          last_interaction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          total_bookings: 0,
          average_rating: null,
          location: "Uppsala",
          notes: "Interested in painting workshops",
          languages: ["Swedish", "English", "Spanish"]
        }
      ];

      return dummyContacts;
    }
  });

  return (
    <div className="space-y-6">
      <ContactsHeader />
      <ContactSearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <Card>
        <ContactsTable contacts={contacts || []} isLoading={isLoading} />
      </Card>
    </div>
  );
};

export default TeacherContacts;
