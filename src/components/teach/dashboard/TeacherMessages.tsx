import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import type { Message } from "../crm/TeacherInbox";

const TeacherMessages = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
                msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
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
          *,
          profiles!communications_student_id_fkey(first_name, last_name),
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
              <TabsTrigger value="unread">Unread ({getUnreadMessages().length})</TabsTrigger>
              <TabsTrigger value="sent">Sent ({getSentMessages().length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No messages yet
                </p>
              ) : (
                messages.map((message) => (
                  <div 
                    key={message.id} 
                    className="border-b pb-4 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">
                          {message.profiles?.first_name} {message.profiles?.last_name}
                        </span>
                        {message.course?.title && (
                          <span className="text-sm text-muted-foreground ml-2">
                            {message.course.title}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(message.sent_at), 'PPp')}
                      </span>
                    </div>
                    <p className="text-sm">{message.message_content}</p>
                  </div>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="unread">
              {getUnreadMessages().length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No unread messages
                </p>
              ) : (
                <div className="space-y-4">
                  {getUnreadMessages().map((message) => (
                    <div 
                      key={message.id} 
                      className="border-b pb-4 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors"
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold">
                            {message.profiles?.first_name} {message.profiles?.last_name}
                          </span>
                          {message.course?.title && (
                            <span className="text-sm text-muted-foreground ml-2">
                              {message.course.title}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(message.sent_at), 'PPp')}
                        </span>
                      </div>
                      <p className="text-sm">{message.message_content}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sent">
              {getSentMessages().length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No sent messages
                </p>
              ) : (
                <div className="space-y-4">
                  {getSentMessages().map((message) => (
                    <div 
                      key={message.id} 
                      className="border-b pb-4 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors"
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold">
                            {message.profiles?.first_name} {message.profiles?.last_name}
                          </span>
                          {message.course?.title && (
                            <span className="text-sm text-muted-foreground ml-2">
                              {message.course.title}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(message.sent_at), 'PPp')}
                        </span>
                      </div>
                      <p className="text-sm">{message.message_content}</p>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {selectedMessage && (
            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Reply to {selectedMessage.profiles?.first_name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
              </div>
              <div className="space-y-4">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your reply..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSendReply}
                    disabled={!newMessage.trim()}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherMessages;
