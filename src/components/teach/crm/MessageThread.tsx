import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: number;
  message_content: string;
  sent_at: string;
  instructor_id: string;
  student_id: string;
  thread_id: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

interface MessageThreadProps {
  threadId: string;
  studentId: string;
}

const MessageThread = ({ threadId, studentId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("communications")
        .select(`
          *,
          profile:profiles!communications_student_id_fkey_profiles(
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq("thread_id", threadId)
        .order("sent_at", { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("communications")
      .insert({
        message_content: newMessage,
        instructor_id: user.id,
        student_id: studentId,
        thread_id: threadId,
        message_type: "reply",
        status: "sent"
      });

    if (!error) {
      setNewMessage("");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.instructor_id ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.profile?.avatar_url || ""} />
                <AvatarFallback>
                  {message.profile?.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col max-w-[70%] ${
                  message.instructor_id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    message.instructor_id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.message_content}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {format(new Date(message.sent_at), "PPp")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[80px]"
          />
          <Button
            onClick={handleSendMessage}
            className="self-end"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;