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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash } from "lucide-react";

interface Template {
  id: string;
  title: string;
  content: string;
  category: string;
}

const MessageTemplates = () => {
  const [newTemplate, setNewTemplate] = useState({ title: "", content: "" });

  const { data: templates, isLoading } = useQuery({
    queryKey: ["message-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("message_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Template[];
    },
  });

  const handleCreateTemplate = async () => {
    if (!newTemplate.title.trim() || !newTemplate.content.trim()) return;

    const { error } = await supabase.from("message_templates").insert([
      {
        title: newTemplate.title,
        content: newTemplate.content,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      },
    ]);

    if (!error) {
      setNewTemplate({ title: "", content: "" });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Template</CardTitle>
          <CardDescription>
            Create reusable message templates for quick responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Template title"
              value={newTemplate.title}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Template content..."
              value={newTemplate.content}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, content: e.target.value })
              }
              className="min-h-[200px]"
            />
          </div>
          <Button onClick={handleCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Templates</CardTitle>
          <CardDescription>
            View and manage your message templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {templates?.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{template.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {template.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageTemplates;