import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, X } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color: string;
}

const ContactTags = ({ contactId }: { contactId: string }) => {
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#6366F1");

  const { data: tags, isLoading } = useQuery({
    queryKey: ["contact-tags", contactId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_tag_assignments")
        .select(`
          contact_tags (
            id,
            name,
            color
          )
        `)
        .eq("contact_id", contactId);

      if (error) throw error;
      return data.map((d: any) => d.contact_tags) as Tag[];
    },
  });

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Create new tag
    const { data: newTag, error: tagError } = await supabase
      .from("contact_tags")
      .insert({
        name: newTagName,
        color: newTagColor,
        created_by: user.id,
      })
      .select()
      .single();

    if (tagError || !newTag) return;

    // Assign tag to contact
    await supabase
      .from("contact_tag_assignments")
      .insert({
        contact_id: contactId,
        tag_id: newTag.id,
        assigned_by: user.id,
      });

    setNewTagName("");
  };

  const handleRemoveTag = async (tagId: string) => {
    await supabase
      .from("contact_tag_assignments")
      .delete()
      .eq("contact_id", contactId)
      .eq("tag_id", tagId);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Tag name"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
        <Input
          type="color"
          value={newTagColor}
          onChange={(e) => setNewTagColor(e.target.value)}
          className="w-20"
        />
        <Button onClick={handleCreateTag}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <Badge
            key={tag.id}
            variant="outline"
            className="flex items-center gap-1 text-sm"
            style={{
              backgroundColor: tag.color + "20",
              borderColor: tag.color,
            }}
          >
            <Tag className="h-3 w-3" />
            {tag.name}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveTag(tag.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ContactTags;