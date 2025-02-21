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
import { Search, Filter, Archive, CheckSquare, Plus, Library, Send, User, MessageSquare, MapPin, Calendar, Star } from "lucide-react";
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
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  languages: string[] | null;
};

export type Message = {
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
  profile: Profile | null;
  course: {
    title: string | null;
    price: number | null;
    duration: string | null;
  } | null;
};

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

  const { data: messages, isLoading } = useQuery({
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
          sent_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
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
          sent_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
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
          sent_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
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
          sent_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
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
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
          status: "confirmed"
        },
        {
          id: 2,
          course: {
            title: "Advanced Pottery Techniques",
            price: 90,
            duration: 180
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), // 2 weeks ago
          status: "completed"
        },
        {
          id: 3,
          course: {
            title: "Sculpture Workshop",
            price: 85,
            duration: 240
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(), // 3 weeks ago
          status: "completed"
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

  React.useEffect(() => {
    if (location.state?.selectedContact) {
      const contact = location.state.selectedContact;
      const contactMessages = messages?.filter(
        msg => msg.profile?.id === contact.id
      );
      if (contactMessages?.[0]) {
        setSelectedMessage(contactMessages[0]);
      }
    }
  }, [location.state, messages]);

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
          <ScrollArea className="h-[600px]">
            <div className="p-4 space-y-0.5">
              {messages?.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b border-neutral-100 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id 
                      ? "bg-accent-purple/5" 
                      : "hover:bg-neutral-50"
                  }`}
                >
                  <div 
                    className="flex items-center gap-3 mb-2"
                    onClick={() => handleContactClick(message)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.profile?.avatar_url || ""} />
                      <AvatarFallback>
                        {message.profile?.first_name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate text-left">
                          {message.profile?.first_name} {message.profile?.last_name}
                        </p>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                          {format(new Date(message.sent_at), "MMM d")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate text-left">
                        {message.communication_context || "No subject"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs truncate text-neutral-600 text-left pl-11">
                    {message.message_content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={45}>
          <ScrollArea className="h-[600px]">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedMessage.profile?.avatar_url || ""} />
                    <AvatarFallback>
                      {selectedMessage.profile?.first_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h2 className="text-base font-semibold">
                      {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {selectedMessage.communication_context}
                    </p>
                  </div>
                </div>
                <div className="prose max-w-none space-y-4">
                  <div className="bg-accent-purple/5 p-4 rounded-lg text-sm text-left border border-accent-purple/10">
                    {selectedMessage.message_content}
                  </div>
                  <div className="text-xs text-muted-foreground text-left">
                    Sent {format(new Date(selectedMessage.sent_at), "PPp")}
                  </div>
                </div>
                <div className="mt-6">
                  <Textarea
                    placeholder="Type your reply..."
                    className="min-h-[100px] text-sm"
                  />
                  <div className="flex justify-end mt-2">
                    <Button className="text-sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Select a message to view details
              </div>
            )}
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30}>
          <ScrollArea className="h-[600px]">
            {selectedMessage ? (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-base font-semibold mb-4 text-left">Contact Information</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
                      </span>
                    </div>
                    {selectedMessage.profile?.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedMessage.profile.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-base font-semibold mb-4 text-left">Booking History</h3>
                  <div className="space-y-3">
                    {studentBookings?.map((booking: any) => (
                      <Card key={booking.id} className="p-3 bg-neutral-50 border-neutral-200">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div className="text-left">
                            <p className="text-sm font-medium">{booking.course?.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(booking.created_at), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {selectedMessage.profile?.languages && (
                  <div className="border-t pt-6">
                    <h3 className="text-base font-semibold mb-4 text-left">Languages</h3>
                    <div className="flex gap-2">
                      {selectedMessage.profile.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMessage.profile?.bio && (
                  <div className="border-t pt-6">
                    <h3 className="text-base font-semibold mb-4 text-left">About</h3>
                    <p className="text-sm text-muted-foreground text-left">
                      {selectedMessage.profile.bio}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Select a message to view contact details
              </div>
            )}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-left">Write New Message</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient" className="text-sm">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Enter recipient ID"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject" className="text-sm">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter message subject"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[200px] text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsComposeOpen(false)}
              variant="outline"
              className="text-sm"
            >
              Cancel
            </Button>
            <Button onClick={handleSendMessage} className="gap-2 text-sm">
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
