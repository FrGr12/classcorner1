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
import { Search, Filter } from "lucide-react";

const Communications = () => {
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
            last_name
          ),
          course:courses(title)
        `)
        .eq("instructor_id", user.id)
        .order("sent_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSendMessage = async (studentId: string, courseId: number, content: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

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
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>
            View and manage all your communications in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inbox" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default Communications;