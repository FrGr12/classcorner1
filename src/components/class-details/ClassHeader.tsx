import { Clock, MapPin, Users, Star, Edit, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { handleError } from "@/utils/errorHandler";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface ClassHeaderProps {
  classItem: ClassItem;
  onBooking: () => void;
}
const ClassHeader = ({
  classItem,
  onBooking
}: ClassHeaderProps) => {
  const navigate = useNavigate();
  const [isInstructor, setIsInstructor] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [privateMessage, setPrivateMessage] = useState("");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([checkInstructor(), checkFollowStatus()]);
      } catch (error) {
        handleError(error, {
          title: "Failed to load instructor data",
          description: "Please try refreshing the page"
        });
      }
    };
    fetchData();
  }, [classItem.id]);
  const checkInstructor = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data: course
      } = await supabase.from("courses").select("instructor_id").eq("id", classItem.id).single();
      setIsInstructor(course?.instructor_id === user.id);
    } catch (error) {
      throw new Error("Failed to verify instructor status");
    }
  };
  const checkFollowStatus = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data: followData
      } = await supabase.from("teacher_follows").select("id").eq("student_id", user.id).eq("teacher_id", classItem.instructor_id).eq("status", "active").single();
      setIsFollowing(!!followData);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };
  const handlePrivateRequest = async () => {
    try {
      setIsLoading(true);
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Authentication required", {
          description: "Please sign in to request a private class"
        });
        navigate("/auth", {
          state: {
            returnTo: window.location.pathname
          }
        });
        return;
      }
      const {
        error: messageError
      } = await supabase.from("communications").insert({
        student_id: user.id,
        instructor_id: classItem.instructor_id,
        course_id: classItem.id,
        message_content: privateMessage,
        message_type: "private_request",
        status: "pending"
      });
      if (messageError) throw messageError;
      toast.success("Request sent successfully", {
        description: "Your private class request has been sent to the instructor"
      });
      setIsMessageOpen(false);
      setPrivateMessage("");
    } catch (error) {
      handleError(error, {
        title: "Failed to send request",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Authentication required", {
          description: "Please sign in to follow instructors"
        });
        navigate("/auth", {
          state: {
            returnTo: window.location.pathname
          }
        });
        return;
      }
      if (isFollowing) {
        await supabase.from("teacher_follows").delete().eq("student_id", user.id).eq("teacher_id", classItem.instructor_id);
        toast.success("Instructor unfollowed");
      } else {
        await supabase.from("teacher_follows").insert({
          student_id: user.id,
          teacher_id: classItem.instructor_id,
          status: "active"
        });
        toast.success("Now following instructor");
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      handleError(error, {
        title: "Follow action failed",
        description: "Unable to update follow status"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleAskQuestion = async () => {
    try {
      setIsLoading(true);
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Authentication required", {
          description: "Please sign in to ask a question"
        });
        navigate("/auth", {
          state: {
            returnTo: window.location.pathname
          }
        });
        return;
      }
      const {
        error: questionError
      } = await supabase.from("communications").insert({
        student_id: user.id,
        instructor_id: classItem.instructor_id,
        course_id: classItem.id,
        message_content: question,
        message_type: "question",
        status: "pending"
      });
      if (questionError) throw questionError;
      const {
        error: notificationError
      } = await supabase.from("notification_logs").insert({
        user_id: classItem.instructor_id,
        notification_type: "question",
        content: `New question from a student about ${classItem.title}`,
        status: "pending",
        reference_id: classItem.id.toString()
      });
      if (notificationError) throw notificationError;
      toast.success("Question sent", {
        description: "Your question has been sent to the instructor"
      });
      setIsQuestionDialogOpen(false);
      setQuestion("");
    } catch (error) {
      handleError(error, {
        title: "Failed to send question",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleQuestion = () => {
    navigate(`/community/post/new?courseId=${classItem.id}&type=question`);
  };
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const getParticipantRange = () => {
    const min = classItem.minParticipants ?? 1;
    const max = classItem.maxParticipants ?? 10;
    return `${min}-${max} people`;
  };
  return <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
      <div className="space-y-4 text-left">
        <div>
          <h1 className="font-bold mb-2 text-left text-xl">{classItem.title}</h1>
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
            <span>{getParticipantRange()}</span>
          </div>
          <button onClick={scrollToReviews} className="flex items-center gap-1 hover:text-accent-purple transition-colors cursor-pointer">
            <Star className="h-4 w-4 fill-accent-purple text-accent-purple" />
            <span>{classItem.rating}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-right">
          <p className="text-2xl font-bold">${classItem.price}</p>
          <p className="text-sm text-neutral-600">per person</p>
        </div>
        <div className="flex gap-2">
          {isInstructor ? <Button size="lg" variant="outline" className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10" onClick={() => navigate(`/teach/edit/${classItem.id}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button> : <div className="flex flex-wrap gap-2">
              <Button size="lg" className="w-full md:w-auto bg-accent-purple hover:bg-accent-purple/90" onClick={onBooking}>
                Book Now
              </Button>
              <Button size="lg" variant="outline" className="w-full md:w-auto border-accent-purple text-accent-purple hover:bg-accent-purple/10" onClick={() => setIsMessageOpen(true)}>
                Request Private Class
              </Button>
              <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsContactDialogOpen(true)}>
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant={isFollowing ? "default" : "outline"} className={`w-full md:w-auto ${isFollowing ? 'bg-accent-purple hover:bg-accent-purple/90' : ''}`} onClick={handleFollow} disabled={isLoading}>
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsQuestionDialogOpen(true)} data-question-trigger>
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
            </div>}
        </div>
      </div>

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
              <Textarea id="message" placeholder="Tell the instructor about your private class request..." value={privateMessage} onChange={e => setPrivateMessage(e.target.value)} className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePrivateRequest} disabled={isLoading || !privateMessage.trim()}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Instructor</DialogTitle>
            <DialogDescription>
              Get in touch with the instructor through your preferred method.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => {
            window.location.href = `mailto:${classItem.instructorEmail}`;
            setIsContactDialogOpen(false);
          }}>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => {
            window.location.href = `tel:${classItem.instructorPhone}`;
            setIsContactDialogOpen(false);
          }}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Send your question to the instructor. They'll be notified and will respond to you directly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Your Question</Label>
              <Textarea id="question" placeholder="What would you like to know about this class?" value={question} onChange={e => setQuestion(e.target.value)} className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuestionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAskQuestion} disabled={isLoading || !question.trim()}>
              Send Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default ClassHeader;