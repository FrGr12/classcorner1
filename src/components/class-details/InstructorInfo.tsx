import { useEffect, useState } from "react";
import { Mail, Phone, UserPlus, UserMinus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InstructorInfoProps {
  classItem: ClassItem;
  onShowQuestion: () => void;
}

const InstructorInfo = ({ classItem, onShowQuestion }: InstructorInfoProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [privateMessage, setPrivateMessage] = useState("");
  const { toast } = useToast();

  const checkFollowStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !classItem.instructor_id) return;

      const { data } = await supabase
        .from('teacher_follows')
        .select('id')
        .eq('student_id', user.id)
        .eq('teacher_id', classItem.instructor_id)
        .eq('status', 'active')
        .single();

      setIsFollowing(!!data);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to follow instructors",
          variant: "destructive"
        });
        return;
      }

      if (!classItem.instructor_id) {
        toast({
          title: "Error",
          description: "Instructor ID not found",
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);

      if (isFollowing) {
        const { error } = await supabase
          .from('teacher_follows')
          .delete()
          .eq('student_id', user.id)
          .eq('teacher_id', classItem.instructor_id);

        if (error) throw error;

        toast({
          title: "Unfollowed",
          description: `You have unfollowed ${classItem.instructor}`
        });
      } else {
        const { error } = await supabase
          .from('teacher_follows')
          .insert({
            student_id: user.id,
            teacher_id: classItem.instructor_id,
            status: 'active'
          });

        if (error) throw error;

        toast({
          title: "Following",
          description: `You are now following ${classItem.instructor}`
        });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivateRequest = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to request a private class",
          variant: "destructive"
        });
        return;
      }

      const { error: messageError } = await supabase
        .from("communications")
        .insert({
          student_id: user.id,
          instructor_id: classItem.instructor_id,
          course_id: classItem.id,
          message_content: privateMessage,
          message_type: "private_request",
          status: "pending"
        });

      if (messageError) throw messageError;

      toast({
        title: "Success",
        description: "Private class request sent successfully"
      });
      setIsMessageOpen(false);
      setPrivateMessage("");
    } catch (error) {
      console.error('Error sending private request:', error);
      toast({
        title: "Error",
        description: "Failed to send private class request"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, [classItem.instructor_id]);

  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">About the Instructor</h2>
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex-shrink-0" />
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium text-left">{classItem.instructor}</h3>
            <p className="text-neutral-600 text-left">Expert Craftsperson</p>
          </div>
          <p className="text-neutral-600 text-left">
            An experienced instructor with over 10 years of teaching experience, passionate about sharing creative skills
            and helping students discover their artistic potential.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setIsContactDialogOpen(true)}
            >
              <Mail className="h-4 w-4" />
              Contact
            </Button>
            <Button 
              variant={isFollowing ? "default" : "outline"}
              size="sm"
              className={`gap-2 ${isFollowing ? 'bg-accent-purple hover:bg-accent-purple/90' : 'border-accent-purple text-accent-purple hover:bg-accent-purple/10'}`}
              onClick={handleFollowToggle}
              disabled={isLoading}
            >
              {isFollowing ? (
                <UserMinus className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={onShowQuestion}
            >
              <MessageCircle className="h-4 w-4" />
              Ask a Question
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Instructor</DialogTitle>
            <DialogDescription>
              Get in touch with the instructor through your preferred method.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                window.location.href = `mailto:${classItem.instructorEmail}`;
                setIsContactDialogOpen(false);
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                window.location.href = `tel:${classItem.instructorPhone}`;
                setIsContactDialogOpen(false);
              }}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Private Class</DialogTitle>
            <DialogDescription>
              Send a message to the instructor requesting a private class session.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell the instructor about your private class request..."
                value={privateMessage}
                onChange={(e) => setPrivateMessage(e.target.value)}
                className="min-h-[100px]"
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
              onClick={handlePrivateRequest}
              disabled={isLoading || !privateMessage.trim()}
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InstructorInfo;
