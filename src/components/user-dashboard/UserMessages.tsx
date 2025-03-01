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
import { Search, Filter, PenSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import Skeleton, { SkeletonList } from "@/components/ui/skeleton-loader";
import { handleError } from "@/utils/errorHandler";

interface Message {
  id: number;
  message_type: string;
  message_content: string;
  sent_at: string;
  read_at: string | null;
  status: string;
  student_id: string;
  course_id: number | null;
  instructor_id: string;
  thread_id: string | null;
  is_unread: boolean;
  assigned_to: string | null;
  communication_context: string | null;
  last_activity_at: string | null;
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    location: string | null;
    bio: string | null;
    languages: string[] | null;
  } | null;
  course: {
    title: string | null;
    price: number | null;
    duration: string | null;
  } | null;
}

const UserMessages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery({
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
    }
  });

  const handleSendMessage = async () => {
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
  };

  const renderMessagesSkeleton = () => (
    <div className="p-4 space-y-2">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={32} height={32} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <Skeleton variant="text" width="30%" height={16} />
                <Skeleton variant="text" width="20%" height={12} />
              </div>
              <Skeleton variant="text" width="80%" height={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMessageDetailSkeleton = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="circular" width={40} height={40} />
        <div>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={180} height={16} />
        </div>
      </div>
      <div className="prose max-w-none">
        <div className="bg-muted p-4 rounded-lg">
          <SkeletonList count={3} height={16} />
        </div>
      </div>
      <div className="mt-6">
        <Skeleton variant="rectangular" className="min-h-[100px] w-full" />
        <div className="flex justify-end mt-2">
          <Skeleton variant="button" width={100} height={36} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Button 
          onClick={() => setIsComposeOpen(true)}
          className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white"
        >
          <PenSquare className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-[600px]">
            {isLoading ? (
              renderMessagesSkeleton()
            ) : messages?.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No messages found</p>
            ) : (
              <div className="p-4 space-y-2">
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? "bg-accent-purple/5 border-accent-purple"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.profile?.avatar_url || ""} />
                        <AvatarFallback>
                          {message.profile?.first_name?.[0] || "T"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">
                            {message.profile?.first_name} {message.profile?.last_name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(message.sent_at), "MMM d")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {message.message_content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={60}>
          {selectedMessage ? (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedMessage.profile?.avatar_url || ""} />
                  <AvatarFallback>
                    {selectedMessage.profile?.first_name?.[0] || "T"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">
                    {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.communication_context}
                  </p>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="bg-muted p-4 rounded-lg">
                  {selectedMessage.message_content}
                </div>
              </div>
              <div className="mt-6">
                <Textarea
                  placeholder="Type your reply..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white">
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            renderMessageDetailSkeleton()
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a message to view details
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Type your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsComposeOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white"
              disabled={!messageContent.trim()}
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserMessages;
