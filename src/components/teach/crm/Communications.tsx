import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, MessageSquare } from "lucide-react";
import MessagesTable from "./MessagesTable";

type Communication = {
  id: number;
  student_id: string;
  course_id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
  profile: {
    first_name: string | null;
    last_name: string | null;
  };
  course: {
    title: string;
  };
};

const Communications = () => {
  const [messages, setMessages] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('communications')
        .select(`
          *,
          profile:profiles!communications_student_id_fkey_profiles(first_name, last_name),
          course:courses(title)
        `)
        .eq('instructor_id', user.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;

      setMessages(data as Communication[]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch messages",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (studentId: string, courseId: number, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('communications')
        .insert({
          instructor_id: user.id,
          student_id: studentId,
          course_id: courseId,
          message_type: 'notification',
          message_content: content,
          status: 'sent'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message sent successfully",
      });

      fetchMessages();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Communications
        </CardTitle>
        <CardDescription>
          View and manage your communications with students
        </CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <p className="text-center text-neutral-600 py-8">
            No communications found. Messages with your students will appear here.
          </p>
        ) : (
          <MessagesTable messages={messages} onSendMessage={handleSendMessage} />
        )}
      </CardContent>
    </Card>
  );
};

export default Communications;