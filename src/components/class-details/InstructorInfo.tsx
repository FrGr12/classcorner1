
import { useEffect, useState } from "react";
import { Mail, Phone, UserPlus, UserMinus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
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
    <section className="glass-panel rounded-xl p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left">About the Instructor</h2>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-full flex-shrink-0" />
        <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
          <div>
            <Link to={`/instructor/${classItem.instructor_id}`} className="hover:underline">
              <h3 className="text-lg sm:text-xl font-medium">{classItem.instructor}</h3>
            </Link>
            <p className="text-sm sm:text-base text-neutral-600">Expert Craftsperson</p>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 max-w-prose">
            An experienced instructor with over 10 years of teaching experience, passionate about sharing creative skills
            and helping students discover their artistic potential.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9"
              onClick={() => setIsContactDialogOpen(true)}
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Contact
            </Button>
            <Button 
              variant={isFollowing ? "default" : "outline"}
              size="sm"
              className={`text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9 ${
                isFollowing 
                  ? 'bg-accent-purple hover:bg-accent-purple/90' 
                  : 'border-accent-purple text-accent-purple hover:bg-accent-purple/10'
              }`}
              onClick={handleFollowToggle}
              disabled={isLoading}
            >
              {isFollowing ? (
                <UserMinus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
              {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9"
              onClick={onShowQuestion}
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Ask a Question
            </Button>
            <Button
              variant="outline" 
              size="sm"
              className="text-xs sm:text-sm gap-1.5 sm:gap-2 h-8 sm:h-9"
              as={Link}
              to={`/instructor/${classItem.instructor_id}`}
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Contact Instructor</DialogTitle>
            <DialogDescription className="text-sm">
              Get in touch with the instructor through your preferred method.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
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
              className="w-full justify-start text-sm"
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
        <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Request Private Class</DialogTitle>
            <DialogDescription className="text-sm">
              Send a message to the instructor requesting a private class session.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
            <div className="grid gap-2">
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell the instructor about your private class request..."
                value={privateMessage}
                onChange={(e) => setPrivateMessage(e.target.value)}
                className="min-h-[100px] text-sm"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsMessageOpen(false)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePrivateRequest}
              disabled={isLoading || !privateMessage.trim()}
              className="text-sm"
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
