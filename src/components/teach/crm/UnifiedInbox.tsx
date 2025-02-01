import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Filter } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: number;
  student_id: string;
  message_content: string;
  sent_at: string;
  status: string;
  thread_id: string | null;
  profile: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
}

interface UnifiedInboxProps {
  onThreadSelect?: (thread: { id: string; studentId: string }) => void;
}

const UnifiedInbox = ({ onThreadSelect }: UnifiedInboxProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("communications")
        .select(`
          *,
          profile:profiles!communications_student_id_fkey_profiles(
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq("instructor_id", user.id)
        .order("sent_at", { ascending: false });

      if (error) throw error;
      return data as Message[];
    },
  });

  const filteredMessages = messages?.filter((message) => {
    const matchesSearch =
      searchTerm === "" ||
      message.profile.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.profile.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message_content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      unread: "destructive",
      replied: "default",
      pending: "secondary",
      closed: "default",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const handleThreadSelect = (message: any) => {
    onThreadSelect?.({
      id: message.thread_id || message.id.toString(),
      studentId: message.student_id
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unified Inbox</CardTitle>
        <CardDescription>
          Manage all your communications in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
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

        <div className="space-y-4">
          {filteredMessages?.map((message) => (
            <div
              key={message.id}
              className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => handleThreadSelect(message)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">
                    {message.profile.first_name} {message.profile.last_name}
                  </span>
                  {getStatusBadge(message.status)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {message.message_content}
                </p>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(message.sent_at), "PPp")}
                </span>
              </div>
              <Button variant="outline" size="sm">
                View Thread
              </Button>
            </div>
          ))}

          {filteredMessages?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No messages found matching your filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedInbox;
