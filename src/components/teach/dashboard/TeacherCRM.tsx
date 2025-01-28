import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send } from "lucide-react";

const TeacherCRM = () => {
  const { toast } = useToast();
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [messageContent, setMessageContent] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string>("all");

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(`
          *,
          student:profiles(
            id,
            first_name,
            last_name,
            email
          ),
          course:courses(
            title
          )
        `);

      if (error) throw error;
      return bookings;
    },
  });

  const sendMessage = async () => {
    try {
      // Get current user (instructor) ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get recipient IDs based on selection
      const recipientIds = contacts
        ?.filter(booking => {
          if (selectedRecipients === "all") return true;
          if (selectedRecipients === "active") return booking.status === "confirmed";
          if (selectedRecipients === "waitlist") return booking.status === "waitlist";
          return false;
        })
        .map(booking => booking.student?.id)
        .filter((id): id is string => id !== undefined);

      if (!recipientIds?.length) {
        throw new Error("No recipients selected");
      }

      // Insert a message for each recipient
      const { error } = await supabase.from("communications").insert(
        recipientIds.map(studentId => ({
          instructor_id: user.id,
          student_id: studentId,
          message_content: messageContent,
          message_type: "bulk",
          status: "sent"
        }))
      );

      if (error) throw error;

      toast({
        title: "Message sent successfully",
        description: "Your message has been sent to the selected participants.",
      });
      setMessageContent("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">CRM & Messaging</h1>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contact List</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Segmentation</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedSegment}
                onValueChange={setSelectedSegment}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="active">Active Students</SelectItem>
                  <SelectItem value="past">Past Students</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts?.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {booking.student?.first_name} {booking.student?.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.course?.title}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">To:</label>
                  <Select
                    value={selectedRecipients}
                    onValueChange={setSelectedRecipients}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="active">Active Students</SelectItem>
                      <SelectItem value="waitlist">Waitlist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Message:</label>
                  <Textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[200px]"
                  />
                </div>

                <Button
                  onClick={sendMessage}
                  disabled={!messageContent}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherCRM;