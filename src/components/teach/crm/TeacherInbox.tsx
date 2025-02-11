import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Archive, CheckSquare, Plus, Library, Send } from "lucide-react";
import MessagesTable from "./MessagesTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  thread_id: string | null;
  is_unread: boolean;
  assigned_to?: string | null;
  communication_context?: string | null;
  last_activity_at?: string | null;
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
  course?: {
    title: string | null;
  } | null;
};

const TeacherInbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
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
          profiles:profiles!communications_student_id_fkey(
            first_name,
            last_name
          ),
          course:courses(title)
        `)
        .eq("instructor_id", user.id)
        .order("sent_at", { ascending: false });

      if (error) throw error;

      return data as Message[];
    },
  });

  const handleSendMessage = async () => {
    if (!recipient || !messageSubject || !messageContent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

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
          student_id: recipient,
          message_type: "direct",
          message_content: messageContent,
          status: "sent",
          is_unread: true,
          thread_id: crypto.randomUUID(),
          communication_context: messageSubject
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
      setIsComposeOpen(false);
      setMessageSubject("");
      setMessageContent("");
      setRecipient("");
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
      <Card className="p-6">
        <div className="flex items-center justify-between">
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
              Templates
            </Button>
            <Button 
              className="bg-accent-purple hover:bg-accent-purple/90 text-white"
              onClick={() => setIsComposeOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Write Message
            </Button>
          </div>
        </div>
      </Card>

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
            selectedMessage={selectedMessage}
            onMessageSelect={setSelectedMessage}
          />
        )}
      </Card>

      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Write New Message</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Enter recipient ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter message subject"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsComposeOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={handleSendMessage} className="gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherInbox;
