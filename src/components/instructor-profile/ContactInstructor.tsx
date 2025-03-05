
import { useState } from "react";
import { Mail, Phone, MessageSquare, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InstructorProfile } from "@/types/instructor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactInstructorProps {
  instructor: InstructorProfile;
}

const ContactInstructor = ({ instructor }: ContactInstructorProps) => {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isPrivateClassDialogOpen, setIsPrivateClassDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [privateClassDetails, setPrivateClassDetails] = useState({
    topic: "",
    preferredDate: "",
    preferredTime: "",
    numberOfPeople: "1",
    additionalDetails: ""
  });
  
  const handleSendMessage = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast("Please sign in to contact instructors", {
          description: "Create an account to message instructors"
        });
        setIsMessageDialogOpen(false);
        return;
      }
      
      const { error } = await supabase.from("communications").insert({
        student_id: user.id,
        instructor_id: instructor.id,
        message_content: message,
        message_type: "inquiry",
        communication_context: subject,
        status: "sent"
      });
      
      if (error) throw error;
      
      toast.success("Message sent successfully!");
      setIsMessageDialogOpen(false);
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRequestPrivateClass = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast("Please sign in to request private classes", {
          description: "Create an account to make requests"
        });
        setIsPrivateClassDialogOpen(false);
        return;
      }
      
      const messageContent = `
        Private Class Request
        
        Topic: ${privateClassDetails.topic}
        Preferred Date: ${privateClassDetails.preferredDate}
        Preferred Time: ${privateClassDetails.preferredTime}
        Number of People: ${privateClassDetails.numberOfPeople}
        
        Additional Details:
        ${privateClassDetails.additionalDetails}
      `;
      
      const { error } = await supabase.from("communications").insert({
        student_id: user.id,
        instructor_id: instructor.id,
        message_content: messageContent,
        message_type: "private_request",
        communication_context: "Private Class Request",
        status: "sent"
      });
      
      if (error) throw error;
      
      toast.success("Private class request sent successfully!");
      setIsPrivateClassDialogOpen(false);
      setPrivateClassDetails({
        topic: "",
        preferredDate: "",
        preferredTime: "",
        numberOfPeople: "1",
        additionalDetails: ""
      });
    } catch (error) {
      console.error("Error requesting private class:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact {instructor.firstName}</h2>
        
        <div className="space-y-4 mb-6">
          <Button 
            variant="default" 
            className="w-full gap-2 bg-accent-purple hover:bg-accent-purple/90" 
            onClick={() => setIsMessageDialogOpen(true)}
          >
            <MessageSquare className="h-4 w-4" />
            Send Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full gap-2" 
            onClick={() => setIsPrivateClassDialogOpen(true)}
          >
            <Calendar className="h-4 w-4" />
            Request Private Class
          </Button>
        </div>
        
        {(instructor.email || instructor.phone) && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Direct Contact</h3>
            
            {instructor.email && (
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-neutral-500" />
                <a 
                  href={`mailto:${instructor.email}`} 
                  className="text-accent-purple hover:underline"
                >
                  {instructor.email}
                </a>
              </div>
            )}
            
            {instructor.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-neutral-500" />
                <a 
                  href={`tel:${instructor.phone}`} 
                  className="text-accent-purple hover:underline"
                >
                  {instructor.phone}
                </a>
              </div>
            )}
          </div>
        )}
      </Card>
      
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Teaching Stats</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-600">Response Rate</span>
            <span className="font-medium">95%</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-neutral-600">Response Time</span>
            <span className="font-medium">{"< 24 hours"}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-neutral-600">Completion Rate</span>
            <span className="font-medium">98%</span>
          </div>
          
          <div className="flex items-center gap-2 text-green-600 mt-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Identity Verified</span>
          </div>
        </div>
      </Card>
      
      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Message to {instructor.firstName}</DialogTitle>
            <DialogDescription>
              Send a direct message to the instructor. They usually respond within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Question about your pottery class"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim() || !subject.trim()}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Private Class Dialog */}
      <Dialog open={isPrivateClassDialogOpen} onOpenChange={setIsPrivateClassDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request a Private Class</DialogTitle>
            <DialogDescription>
              Send a request for a private class with {instructor.firstName}. 
              They'll respond with availability and pricing options.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="topic">Interested In</Label>
              <Input 
                id="topic" 
                value={privateClassDetails.topic}
                onChange={(e) => setPrivateClassDetails({...privateClassDetails, topic: e.target.value})}
                placeholder="e.g., Beginner pottery, Advanced painting"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input 
                  id="preferredDate"
                  type="date"
                  value={privateClassDetails.preferredDate}
                  onChange={(e) => setPrivateClassDetails({...privateClassDetails, preferredDate: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Input 
                  id="preferredTime"
                  type="time"
                  value={privateClassDetails.preferredTime}
                  onChange={(e) => setPrivateClassDetails({...privateClassDetails, preferredTime: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="numberOfPeople">Number of Participants</Label>
              <Input 
                id="numberOfPeople"
                type="number"
                min="1"
                value={privateClassDetails.numberOfPeople}
                onChange={(e) => setPrivateClassDetails({...privateClassDetails, numberOfPeople: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="additionalDetails">Additional Details or Questions</Label>
              <Textarea
                id="additionalDetails"
                value={privateClassDetails.additionalDetails}
                onChange={(e) => setPrivateClassDetails({...privateClassDetails, additionalDetails: e.target.value})}
                placeholder="Any specific requirements or questions you have..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrivateClassDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRequestPrivateClass}
              disabled={isLoading || !privateClassDetails.topic.trim()}
            >
              {isLoading ? "Sending Request..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactInstructor;
