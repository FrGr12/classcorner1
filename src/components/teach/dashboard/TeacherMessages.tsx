import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const TeacherMessages = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

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
          profile:profiles!communications_student_id_fkey(first_name, last_name),
          course:courses(title)
        `)
        .eq('instructor_id', user.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast.error(error.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
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
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Manage your communications with students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No messages yet
                </p>
              ) : (
                messages.map((message: any) => (
                  <div key={message.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">
                          {message.profile?.first_name} {message.profile?.last_name}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {message.course?.title}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(message.sent_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.message_content}</p>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="unread">
              <p className="text-center text-muted-foreground py-8">
                No unread messages
              </p>
            </TabsContent>
            <TabsContent value="sent">
              <p className="text-center text-muted-foreground py-8">
                No sent messages
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMessages;