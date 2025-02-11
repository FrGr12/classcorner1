
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Archive, CheckSquare, Plus, Library } from "lucide-react";
import MessagesTable from "./MessagesTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Message = {
  id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
  student_id: string;
  course_id: number;
  instructor_id: string;
  thread_id: string;
  is_unread: boolean;
  assigned_to?: string | null;
  communication_context?: string | null;
  last_activity_at?: string | null;
  student_profile?: {
    first_name: string | null;
    last_name: string | null;
  };
  course?: {
    title: string | null;
  };
};

const TeacherInbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in to view messages",
        });
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("communications")
        .select(`
          *,
          student_profile:profiles!communications_student_id_fkey(
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

      return data as Message[];
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
          status: "sent",
          is_unread: true,
          thread_id: crypto.randomUUID()
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
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Manage your communications with students
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10"
            >
              <Library className="mr-2 h-4 w-4" />
              Saved Templates
            </Button>
            <Button 
              className="bg-accent-purple hover:bg-accent-purple/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
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
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <CheckSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center py-8">Loading messages...</div>
        ) : (
          <MessagesTable 
            messages={messages || []} 
            onSendMessage={handleSendMessage}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherInbox;
