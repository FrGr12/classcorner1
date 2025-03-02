
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Message } from "./types";

export const useTeacherMessages = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "sent">("all");

  useEffect(() => {
    fetchMessages();
    const cleanup = setupRealtimeSubscription();
    return cleanup;
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
      setMessages(data as unknown as Message[]);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast.error(error.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage || !newMessage.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to send messages");
        return;
      }

      const { error } = await supabase
        .from('communications')
        .insert({
          message_content: newMessage,
          message_type: "reply",
          instructor_id: user.id,
          student_id: selectedMessage.student_id,
          status: 'sent',
          thread_id: selectedMessage.thread_id,
          is_unread: true
        });

      if (error) throw error;

      setNewMessage("");
      toast.success("Message sent successfully");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    }
  };

  const getUnreadMessages = () => {
    return messages.filter(msg => msg.status === 'unread');
  };

  const getSentMessages = () => {
    return messages.filter(msg => msg.instructor_id);
  };

  const getFilteredMessages = () => {
    switch (activeTab) {
      case "unread":
        return getUnreadMessages();
      case "sent":
        return getSentMessages();
      default:
        return messages;
    }
  };

  return {
    loading,
    messages: getFilteredMessages(),
    newMessage,
    setNewMessage,
    selectedMessage,
    setSelectedMessage,
    activeTab,
    setActiveTab,
    handleSendReply,
    getUnreadMessages,
    getSentMessages
  };
};
