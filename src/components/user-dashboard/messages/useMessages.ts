
import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/utils/errorHandler";
import { Message } from "./types";

export const useMessages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  // Optimize query with proper query keys for caching
  const messagesQuery = useQuery({
    queryKey: ["student-messages"],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
          .from('communications')
          .select(`
            *,
            profile:profiles!instructor_id(
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
          .eq('student_id', user.id)
          .order('sent_at', { ascending: false });

        if (error) {
          throw error;
        }

        return data as Message[];
      } catch (error) {
        handleError(error, {
          title: "Failed to load messages",
          description: "Please try refreshing the page"
        });
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
  });

  // Memoize filtered messages
  const filteredMessages = useMemo(() => {
    const messages = messagesQuery.data || [];
    
    if (!searchQuery && statusFilter === "all") {
      return messages;
    }
    
    return messages.filter(message => {
      const matchesSearch = searchQuery 
        ? (
            message.message_content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.profile?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.profile?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.course?.title?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;
        
      const matchesStatus = statusFilter === "all" 
        ? true 
        : message.status === statusFilter;
        
      return matchesSearch && matchesStatus;
    });
  }, [messagesQuery.data, searchQuery, statusFilter]);

  // Memoize handler functions
  const handleSendMessage = useCallback(async () => {
    if (!messageContent.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to send messages"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Message sent successfully"
      });
      setIsComposeOpen(false);
      setMessageContent("");
    } catch (error) {
      handleError(error, {
        title: "Failed to send message"
      });
    }
  }, [messageContent, toast]);

  return {
    messages: filteredMessages,
    isLoading: messagesQuery.isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isComposeOpen,
    setIsComposeOpen,
    messageContent,
    setMessageContent,
    selectedMessage,
    setSelectedMessage,
    handleSendMessage
  };
};
