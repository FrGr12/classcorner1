
import { useState, useEffect } from "react";
import { ClassItem } from "@/types/class";
import { supabase } from "@/integrations/supabase/client";
import { InstructorClassification } from "@/types/user";

export const useInstructorInfo = (classItem: ClassItem) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const getInstructorIdForDemo = (instructorName: string): string => {
    const nameToIdMap: Record<string, string> = {
      "Sarah Johnson": "1",
      "Michael Chen": "2",
      "Marco Rossi": "3",
      "Lisa Wong": "3",
      "Emily Parker": "2",
      "Daniel White": "1",
      "Emma Thompson": "3",
      "David Wilson": "2",
      "James Miller": "1",
      "Sophie Clark": "3"
    };
    
    return nameToIdMap[instructorName] || 
           instructorName === "Sarah Johnson" ? "1" : 
           instructorName === "Michael Chen" ? "2" : 
           instructorName === "Marco Rossi" ? "3" : 
           (classItem.instructor_id || "1");
  };

  const getInstructorClassificationForDemo = (instructorName: string): InstructorClassification => {
    const nameToBadgeMap: Record<string, InstructorClassification> = {
      "Sarah Johnson": "certified",
      "Michael Chen": "host",
      "Marco Rossi": "certified",
      "Lisa Wong": "host",
      "Emily Parker": "certified",
      "Daniel White": "host",
      "Emma Thompson": "certified",
      "David Wilson": "host",
      "James Miller": "certified",
      "Sophie Clark": "host"
    };
    
    return nameToBadgeMap[instructorName] || null;
  };

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

  useEffect(() => {
    checkFollowStatus();
  }, [classItem.instructor_id]);

  const instructorId = import.meta.env.DEV 
    ? getInstructorIdForDemo(classItem.instructor)
    : classItem.instructor_id;

  const instructorClassification = getInstructorClassificationForDemo(classItem.instructor);

  return {
    isFollowing,
    setIsFollowing,
    isContactDialogOpen,
    setIsContactDialogOpen,
    isMessageOpen,
    setIsMessageOpen,
    instructorId,
    instructorClassification
  };
};
