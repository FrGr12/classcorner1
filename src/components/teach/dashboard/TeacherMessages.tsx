import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessagesTable from "../crm/MessagesTable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const TeacherMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

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
          *,
          profile:profiles!communications_student_id_fkey_profiles(first_name, last_name),
          course:courses(title)
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
          instructor_id: user.id,
          student_id: studentId,
          course_id: courseId,
          message_type: 'notification',
          message_content: content,
          status: 'sent'
        });

      if (error) throw error;

      toast.success("Message sent successfully");
      fetchMessages();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Button>Compose Message</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Communication Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbox">
            <TabsList>
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="automated">Automated</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Search messages..." className="max-w-sm" />
                <Button variant="outline">Search</Button>
              </div>
              <MessagesTable messages={messages} onSendMessage={handleSendMessage} />
            </TabsContent>
            <TabsContent value="sent">
              <p className="text-neutral-600 py-8 text-center">No sent messages yet.</p>
            </TabsContent>
            <TabsContent value="automated">
              <p className="text-neutral-600 py-8 text-center">No automated messages configured.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMessages;