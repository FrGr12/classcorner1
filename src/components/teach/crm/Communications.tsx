import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MessagesTable from "./MessagesTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, PenSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Communications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      // First get the current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in to view messages",
        });
        throw authError;
      }

      if (!user) {
        toast({
          variant: "destructive",
          title: "Not Authenticated",
          description: "Please sign in to view messages",
        });
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("communications")
        .select(`
          *,
          profile:profiles!communications_student_id_fkey_profiles(
            first_name,
            last_name
          ),
          course:courses(title)
        `)
        .eq("instructor_id", user.id)
        .order("sent_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch messages",
        });
        throw error;
      }

      return data;
    },
    retry: false,
    onError: (error) => {
      console.error("Error fetching messages:", error);
    },
  });

  const handleSendMessage = async (studentId: string, courseId: number, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please sign in to send messages",
        });
        return;
      }

      const { error } = await supabase
        .from("communications")
        .insert({
          instructor_id: user.id,
          student_id: studentId,
          course_id: courseId,
          message_type: "reply",
          message_content: content,
          status: "sent"
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 flex-1">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={() => navigate("/teach/crm/compose")} 
          className="flex items-center gap-2 ml-4"
        >
          <PenSquare className="h-4 w-4" />
          Write a Message
        </Button>
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Loading messages...</div>
          ) : (
            <MessagesTable 
              messages={messages || []} 
              onSendMessage={handleSendMessage}
            />
          )}
        </TabsContent>

        <TabsContent value="sent">
          <p className="text-muted-foreground text-center py-8">
            No sent messages to display.
          </p>
        </TabsContent>

        <TabsContent value="archived">
          <p className="text-muted-foreground text-center py-8">
            No archived messages to display.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communications;