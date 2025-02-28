
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InstructorProfile } from "@/types/instructor";
import { Mail, Phone, Instagram, Linkedin, Globe, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactInstructorProps {
  instructor: InstructorProfile;
}

const ContactInstructor = ({ instructor }: ContactInstructorProps) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to contact instructors");
        return;
      }
      
      // Send message to instructor
      const { error } = await supabase
        .from("communications")
        .insert({
          student_id: user.id,
          instructor_id: instructor.id,
          message_content: message,
          message_type: "inquiry",
          status: "sent",
          communication_context: subject
        });
      
      if (error) throw error;
      
      toast.success("Message sent successfully");
      setMessage("");
      setSubject("");
      setIsMessageOpen(false);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Contact</h2>
        
        <div className="space-y-4">
          <Button 
            className="w-full flex items-center gap-2 justify-start bg-accent-purple hover:bg-accent-purple/90"
            onClick={() => setIsMessageOpen(true)}
          >
            <MessageSquare className="h-4 w-4" />
            Message {instructor.firstName}
          </Button>
          
          {instructor.email && (
            <Button 
              variant="outline"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => window.location.href = `mailto:${instructor.email}`}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          )}
          
          {instructor.phone && (
            <Button 
              variant="outline"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => window.location.href = `tel:${instructor.phone}`}
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
          )}
        </div>
        
        {(instructor.socialMedia?.instagram || 
          instructor.socialMedia?.linkedin || 
          instructor.socialMedia?.website || 
          instructor.portfolioUrl) && (
          <div className="mt-6">
            <h3 className="font-medium mb-3">Connect with {instructor.firstName}</h3>
            <div className="flex gap-3">
              {instructor.socialMedia?.instagram && (
                <a 
                  href={`https://instagram.com/${instructor.socialMedia.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              
              {instructor.socialMedia?.linkedin && (
                <a 
                  href={instructor.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              
              {(instructor.socialMedia?.website || instructor.portfolioUrl) && (
                <a 
                  href={instructor.socialMedia?.website || instructor.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
                  aria-label="Website"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message {instructor.firstName}</DialogTitle>
            <DialogDescription>
              Send a message to {instructor.firstName} about their classes or inquire about private lessons.
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
                placeholder="Enter your message here..."
                className="h-32"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageOpen(false)}
            >
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
    </>
  );
};

export default ContactInstructor;
