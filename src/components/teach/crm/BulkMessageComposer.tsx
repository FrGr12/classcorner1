import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users } from "lucide-react";

const BulkMessageComposer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState("all");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("bulk_message_campaigns")
        .insert({
          instructor_id: user.id,
          title,
          message_content: content,
          recipient_filter: { type: filter },
          status: "scheduled",
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message campaign created successfully",
      });

      setTitle("");
      setContent("");
      setFilter("all");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Message</CardTitle>
        <CardDescription>
          Send a message to multiple students at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Message Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter message title"
          />
        </div>

        <div>
          <Label>Recipients</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select recipient group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active Students</SelectItem>
              <SelectItem value="inactive">Inactive Students</SelectItem>
              <SelectItem value="waitlist">Waitlisted Students</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Message Content</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your message..."
            className="min-h-[200px]"
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={sending}
          className="w-full"
        >
          {sending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Users className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BulkMessageComposer;