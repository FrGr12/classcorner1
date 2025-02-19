
import { Clock, MapPin, Users, Star, Edit, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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

interface ClassHeaderProps {
  classItem: ClassItem;
  onBooking: () => void;
}

const ClassHeader = ({ classItem, onBooking }: ClassHeaderProps) => {
  const navigate = useNavigate();
  const [isInstructor, setIsInstructor] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [privateMessage, setPrivateMessage] = useState("");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkInstructor();
    checkFollowStatus();
  }, [classItem.id]);

  const checkInstructor = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: course } = await supabase
      .from("courses")
      .select("instructor_id")
      .eq("id", classItem.id)
      .single();

    setIsInstructor(course?.instructor_id === user.id);
  };

  const checkFollowStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: followData } = await supabase
      .from("teacher_follows")
      .select("id")
      .eq("student_id", user.id)
      .eq("teacher_id", classItem.instructor_id)
      .eq("status", "active")
      .single();

    setIsFollowing(!!followData);
  };

  const handlePrivateRequest = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to request a private class");
        navigate("/auth", { state: { returnTo: window.location.pathname } });
        return;
      }

      // Insert message into communications table
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

      toast.success("Private class request sent successfully!");
      setIsMessageOpen(false);
      setPrivateMessage("");
    } catch (error) {
      console.error("Error sending private request:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to follow instructors");
        navigate("/auth", { state: { returnTo: window.location.pathname } });
        return;
      }

      if (isFollowing) {
        // Unfollow
        await supabase
          .from("teacher_follows")
          .delete()
          .eq("student_id", user.id)
          .eq("teacher_id", classItem.instructor_id);
        
        toast.success("Instructor unfollowed");
      } else {
        // Follow
        await supabase
          .from("teacher_follows")
          .insert({
            student_id: user.id,
            teacher_id: classItem.instructor_id,
            status: "active"
          });
        
        toast.success("Now following instructor");
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestion = () => {
    navigate(`/community/post/new?courseId=${classItem.id}&type=question`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <div className="space-y-4 text-left">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-left">{classItem.title}</h1>
          <p className="text-neutral-600 text-left">{classItem.category}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>2 hours</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{classItem.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Max {classItem.maxParticipants} people</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent-purple text-accent-purple" />
            <span>{classItem.rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-right">
          <p className="text-2xl font-bold">${classItem.price}</p>
          <p className="text-sm text-neutral-600">per person</p>
        </div>
        <div className="flex gap-2">
          {isInstructor ? (
            <Button 
              size="lg"
              variant="outline"
              className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10"
              onClick={() => navigate(`/teach/edit/${classItem.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button 
                size="lg"
                className="w-full md:w-auto bg-accent-purple hover:bg-accent-purple/90"
                onClick={onBooking}
              >
                Book Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10"
                onClick={() => setIsMessageOpen(true)}
              >
                Request Private Class
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => setIsContactDialogOpen(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button
                variant={isFollowing ? "default" : "outline"}
                className={`w-full md:w-auto ${isFollowing ? 'bg-accent-purple hover:bg-accent-purple/90' : ''}`}
                onClick={handleFollow}
                disabled={isLoading}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={handleQuestion}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Private Class Request Dialog */}
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

      {/* Contact Dialog */}
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
    </div>
  );
};

export default ClassHeader;
