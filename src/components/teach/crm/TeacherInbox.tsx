import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, Library, Plus } from "lucide-react";
import { MessageList } from "./MessageList";
import { MessageDetail } from "./MessageDetail";
import { ContactDetail } from "./ContactDetail";
import { ComposeDialog } from "./ComposeDialog";
import { Message } from "./types";
import { supabase } from "@/integrations/supabase/client";

const TeacherInbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const dummyMessages: Message[] = [
        {
          id: 1,
          message_type: "inquiry",
          message_content: "Hi, I'm interested in your pottery class. Could you tell me more about the materials we'll be using?",
          sent_at: new Date().toISOString(),
          read_at: null,
          status: "unread",
          student_id: "1",
          course_id: 1,
          instructor_id: "dummy-instructor",
          thread_id: "thread1",
          is_unread: true,
          assigned_to: null,
          communication_context: "Pottery Class Inquiry",
          last_activity_at: new Date().toISOString(),
          profile: {
            id: "1",
            first_name: "Emma",
            last_name: "Watson",
            avatar_url: null,
            location: "Stockholm",
            bio: "Art enthusiast looking to explore new creative outlets",
            languages: ["English", "Swedish"]
          },
          course: {
            title: "Introduction to Pottery",
            price: 1200,
            duration: "2 hours"
          }
        },
        {
          id: 2,
          message_type: "feedback",
          message_content: "The woodworking class was amazing! I learned so much about different types of wood and techniques.",
          sent_at: new Date(Date.now() - 86400000).toISOString(),
          read_at: new Date(Date.now() - 43200000).toISOString(),
          status: "read",
          student_id: "2",
          course_id: 2,
          instructor_id: "dummy-instructor",
          thread_id: "thread2",
          is_unread: false,
          assigned_to: null,
          communication_context: "Woodworking Class Feedback",
          last_activity_at: new Date(Date.now() - 43200000).toISOString(),
          profile: {
            id: "2",
            first_name: "James",
            last_name: "Smith",
            avatar_url: null,
            location: "Gothenburg",
            bio: "DIY enthusiast and weekend warrior",
            languages: ["English"]
          },
          course: {
            title: "Advanced Woodworking",
            price: 1500,
            duration: "3 hours"
          }
        },
        {
          id: 3,
          message_type: "question",
          message_content: "Do we need to bring our own canvas for the painting workshop?",
          sent_at: new Date(Date.now() - 172800000).toISOString(),
          read_at: null,
          status: "unread",
          student_id: "3",
          course_id: 3,
          instructor_id: "dummy-instructor",
          thread_id: "thread3",
          is_unread: true,
          assigned_to: null,
          communication_context: "Painting Workshop Materials",
          last_activity_at: new Date(Date.now() - 172800000).toISOString(),
          profile: {
            id: "3",
            first_name: "Sofia",
            last_name: "Andersson",
            avatar_url: null,
            location: "Uppsala",
            bio: "Aspiring artist with a passion for colors",
            languages: ["Swedish", "English", "Spanish"]
          },
          course: {
            title: "Oil Painting Basics",
            price: 900,
            duration: "2.5 hours"
          }
        },
        {
          id: 4,
          message_type: "booking",
          message_content: "I'd like to book a private session for my daughter's birthday. Do you offer group discounts?",
          sent_at: new Date(Date.now() - 259200000).toISOString(),
          read_at: null,
          status: "unread",
          student_id: "4",
          course_id: 4,
          instructor_id: "dummy-instructor",
          thread_id: "thread4",
          is_unread: true,
          assigned_to: null,
          communication_context: "Private Session Inquiry",
          last_activity_at: new Date(Date.now() - 259200000).toISOString(),
          profile: {
            id: "4",
            first_name: "Maria",
            last_name: "Garcia",
            avatar_url: null,
            location: "Stockholm",
            bio: "Mother of two creative kids",
            languages: ["Spanish", "English"]
          },
          course: {
            title: "Ceramic Art for Kids",
            price: 800,
            duration: "1.5 hours"
          }
        },
        {
          id: 5,
          message_type: "support",
          message_content: "I might be running 10 minutes late to tomorrow's class. Is that okay?",
          sent_at: new Date(Date.now() - 345600000).toISOString(),
          read_at: new Date(Date.now() - 342000000).toISOString(),
          status: "read",
          student_id: "5",
          course_id: 5,
          instructor_id: "dummy-instructor",
          thread_id: "thread5",
          is_unread: false,
          assigned_to: null,
          communication_context: "Class Attendance",
          last_activity_at: new Date(Date.now() - 342000000).toISOString(),
          profile: {
            id: "5",
            first_name: "Lars",
            last_name: "Johansson",
            avatar_url: null,
            location: "Malmö",
            bio: "Photography enthusiast",
            languages: ["Swedish", "English", "Danish"]
          },
          course: {
            title: "Digital Photography",
            price: 1100,
            duration: "2 hours"
          }
        }
      ];

      return dummyMessages;
    }
  });

  const { data: studentBookings } = useQuery({
    queryKey: ["bookings", selectedMessage?.student_id],
    enabled: !!selectedMessage?.student_id,
    queryFn: async () => {
      return [
        {
          id: 1,
          course: {
            title: "Introduction to Pottery",
            price: 75,
            duration: 120
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
          status: "confirmed"
        },
        {
          id: 2,
          course: {
            title: "Advanced Pottery Techniques",
            price: 90,
            duration: 180
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
          status: "completed"
        },
        {
          id: 3,
          course: {
            title: "Sculpture Workshop",
            price: 85,
            duration: 240
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
          status: "completed"
        }
      ];
    }
  });

  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      return [
        {
          id: "1",
          first_name: "Emma",
          last_name: "Watson",
          email: "emma@example.com",
          avatar_url: null
        },
        {
          id: "2",
          first_name: "James",
          last_name: "Smith",
          email: "james@example.com",
          avatar_url: null
        },
        {
          id: "3",
          first_name: "Sofia",
          last_name: "Andersson",
          email: "sofia@example.com",
          avatar_url: null
        }
      ];
    }
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

  const handleContactClick = (message: Message) => {
    if (message.profile) {
      navigate("/dashboard/contacts", {
        state: {
          selectedProfile: message.profile,
          fromInbox: true
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your communications with students
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="bg-white text-accent-purple border-accent-purple hover:bg-accent-purple/10 text-sm"
            >
              <Library className="mr-2 h-4 w-4" />
              Templates
            </Button>
            <Button 
              className="bg-accent-purple hover:bg-accent-purple/90 text-white text-sm"
              onClick={() => setIsComposeOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Write Message
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 flex-1">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] text-sm">
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
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={25} minSize={20}>
          <MessageList
            messages={messages || []}
            selectedMessage={selectedMessage}
            onMessageSelect={setSelectedMessage}
            onContactClick={handleContactClick}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={45}>
          <MessageDetail selectedMessage={selectedMessage} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30}>
          <ContactDetail
            selectedMessage={selectedMessage}
            studentBookings={studentBookings || []}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ComposeDialog
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        recipient={recipient}
        setRecipient={setRecipient}
        messageSubject={messageSubject}
        setMessageSubject={setMessageSubject}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        onSend={handleSendMessage}
        contacts={contacts || []}
      />
    </div>
  );
};

export default TeacherInbox;
