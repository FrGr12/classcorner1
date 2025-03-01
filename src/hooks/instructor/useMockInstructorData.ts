
/**
 * Hook to fetch mock instructor data for development and preview purposes
 */

import { useState, useEffect } from "react";
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { ClassItem } from "@/types/class";
import { dummyInstructors, dummyReviews } from "@/data/mockInstructors";
import { InstructorProfileResult } from "./types";

export const useMockInstructorData = (id: string | undefined): InstructorProfileResult => {
  const [instructor, setInstructor] = useState<InstructorProfile | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [reviews, setReviews] = useState<InstructorReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const dummyInstructor = id ? dummyInstructors[id] : null;
    
    if (dummyInstructor) {
      setInstructor(dummyInstructor);
      setClasses(dummyInstructor.classes);
      setReviews(dummyReviews.filter(review => review.instructorId === id));
    }
    
    setIsLoading(false);
  }, [id]);

  const filterClasses = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setClasses(instructor?.classes || []);
      return;
    }
    
    if (filter === "active") {
      // Since we don't have a status property in the ClassItem type, we'll skip this filter in the dummy data
      setClasses(instructor?.classes || []);
      return;
    }
    
    // Filter by category
    setClasses((instructor?.classes || []).filter(cls => 
      cls.category?.toLowerCase() === filter.toLowerCase()
    ));
  };

  return {
    instructor,
    classes,
    reviews,
    isLoading,
    activeFilter,
    filterClasses
  };
};
