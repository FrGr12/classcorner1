
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface Message {
  id: number;
  message_content: string;
  sent_at: string;
  instructor_id: string;
  student_id: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface MessageThreadProps {
  recipientId: string;
  courseId?: number;
}

export default function MessageThread({ recipientId, courseId }: MessageThreadProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getUser();
  }, []);

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', recipientId, courseId],
    queryFn: async () => {
      const query = supabase
        .from('communications')
        .select(`
          *,
          profiles!communications_instructor_id_fkey (
            first_name,
            last_name,
            avatar_url
          )
        `)
        .or(`instructor_id.eq.${currentUserId},student_id.eq.${currentUserId}`)
        .order('sent_at', { ascending: true });

      if (courseId) {
        query.eq('course_id', courseId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!currentUserId
  });

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.instructor_id === currentUserId ? 'flex-row-reverse' : ''
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.profiles?.avatar_url || undefined} />
              <AvatarFallback>
                {message.profiles?.first_name?.[0] || ''}
                {message.profiles?.last_name?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            <div
              className={`flex flex-col max-w-[70%] ${
                message.instructor_id === currentUserId ? 'items-end' : ''
              }`}
            >
              <div
                className={`rounded-lg p-3 ${
                  message.instructor_id === currentUserId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.message_content}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {format(new Date(message.sent_at), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
