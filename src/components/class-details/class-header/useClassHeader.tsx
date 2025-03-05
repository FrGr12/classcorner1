
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { handleError } from "@/utils/errorHandler";

export const useClassHeader = (classItem: ClassItem) => {
  const navigate = useNavigate();
  const [isInstructor, setIsInstructor] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
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

  const checkInstructor = useCallback(async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      
      if (!user) return;
      
      const { data: course } = await supabase
        .from("courses")
        .select("instructor_id")
        .eq("id", classItem.id)
        .single();
        
      setIsInstructor(course?.instructor_id === user.id);
    } catch (error) {
      throw new Error("Failed to verify instructor status");
    }
  }, [classItem.id]);

  const checkFollowStatus = useCallback(async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      
      if (!user) return;
      
      const { data: followData } = await supabase
        .from("teacher_follows")
        .select("id")
        .eq("student_id", user.id)
        .eq("teacher_id", classItem.instructor_id)
        .eq("status", "active")
        .single();
        
      setIsFollowing(!!followData);
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  }, [classItem.instructor_id]);

  const handlePrivateRequest = useCallback(async (privateMessage: string) => {
    try {
      setIsLoading(true);
      
      const {
        data: { user }
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
      
      toast.success("Request sent successfully", {
        description: "Your private class request has been sent to the instructor"
      });
      
      setIsMessageOpen(false);
    } catch (error) {
      handleError(error, {
        title: "Failed to send request",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  }, [classItem.id, classItem.instructor_id, navigate]);

  const handleFollow = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const {
        data: { user }
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
        await supabase
          .from("teacher_follows")
          .delete()
          .eq("student_id", user.id)
          .eq("teacher_id", classItem.instructor_id);
          
        toast.success("Instructor unfollowed");
      } else {
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
      handleError(error, {
        title: "Follow action failed",
        description: "Unable to update follow status"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isFollowing, classItem.instructor_id, navigate]);

  const handleAskQuestion = useCallback(async (question: string) => {
    try {
      setIsLoading(true);
      
      const {
        data: { user }
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
      
      const { error: questionError } = await supabase
        .from("communications")
        .insert({
          student_id: user.id,
          instructor_id: classItem.instructor_id,
          course_id: classItem.id,
          message_content: question,
          message_type: "question",
          status: "pending"
        });
        
      if (questionError) throw questionError;
      
      const { error: notificationError } = await supabase
        .from("notification_logs")
        .insert({
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
    } catch (error) {
      handleError(error, {
        title: "Failed to send question",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  }, [classItem.id, classItem.instructor_id, classItem.title, navigate]);

  const getParticipantRange = useCallback(() => {
    const min = classItem.minParticipants ?? 1;
    const max = classItem.maxParticipants ?? 10;
    return `${min}-${max} people`;
  }, [classItem.minParticipants, classItem.maxParticipants]);

  const scrollToReviews = useCallback(() => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    isInstructor,
    isMessageOpen,
    setIsMessageOpen,
    isContactDialogOpen,
    setIsContactDialogOpen,
    isQuestionDialogOpen,
    setIsQuestionDialogOpen,
    isFollowing,
    isLoading,
    handlePrivateRequest,
    handleFollow,
    handleAskQuestion,
    getParticipantRange,
    scrollToReviews
  };
};
