import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface Note {
  id: string;
  content: string;
  created_at: string;
  created_by: string;
}

const ContactNotes = ({ contactId }: { contactId: string }) => {
  const [newNote, setNewNote] = useState("");

  const { data: notes, isLoading } = useQuery({
    queryKey: ["contact-notes", contactId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_notes")
        .select("*")
        .eq("contact_id", contactId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Note[];
    },
  });

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("contact_notes")
      .insert({
        contact_id: contactId,
        content: newNote,
        created_by: user.id,
      });

    if (!error) {
      setNewNote("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {notes?.map((note) => (
            <div key={note.id} className="p-4 border rounded-lg">
              <p className="whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {format(new Date(note.created_at), "PPp")}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactNotes;