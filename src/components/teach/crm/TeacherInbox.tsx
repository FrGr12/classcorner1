
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MessagesTable from "./MessagesTable";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  languages: string[] | null;
};

export type Message = {
  id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
  student_id: string;
  course_id: number | null;
  instructor_id: string;
  thread_id: string | null;
  is_unread: boolean;
  assigned_to: string | null;
  communication_context: string | null;
  last_activity_at: string | null;
  profile: Profile | null;
  course: {
    title: string | null;
    price: number | null;
    duration: string | null;
  } | null;
};

const TeacherInbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'communications'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [payload.new as Message, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === payload.new.id ? { ...msg, ...payload.new } as Message : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to view messages");
        return;
      }

      const { data, error } = await supabase
        .from('communications')
        .select(`
          id,
          message_type,
          message_content,
          sent_at,
          read_at,
          status,
          student_id,
          course_id,
          instructor_id,
          thread_id,
          is_unread,
          assigned_to,
          communication_context,
          last_activity_at,
          profile:profiles!student_id(
            id,
            first_name,
            last_name,
            avatar_url,
            location,
            bio,
            languages
          ),
          course:courses(
            title,
            price,
            duration
          )
        `)
        .eq('instructor_id', user.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setMessages(data);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast.error(error.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (studentId: string, courseId: number, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to send messages");
        return;
      }

      const { error } = await supabase
        .from('communications')
        .insert({
          message_content: content,
          message_type: "reply",
          instructor_id: user.id,
          student_id: studentId,
          course_id: courseId,
          status: 'sent',
          is_unread: true,
          communication_context: selectedMessage?.communication_context
            ? `Re: ${selectedMessage.communication_context}`
            : 'Reply'
        });

      if (error) throw error;

      toast.success("Message sent successfully");
      
      // Mark the original message as read
      if (selectedMessage?.is_unread) {
        const { error: updateError } = await supabase
          .from('communications')
          .update({ is_unread: false, read_at: new Date().toISOString() })
          .eq('id', selectedMessage.id);

        if (updateError) console.error("Error marking message as read:", updateError);
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <MessagesTable
            messages={messages}
            selectedMessage={selectedMessage}
            onMessageSelect={setSelectedMessage}
            onSendMessage={handleSendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherInbox;
