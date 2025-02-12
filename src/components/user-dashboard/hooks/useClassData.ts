
import { useState, useEffect } from "react";
import { ClassPreview } from "../types";

export const useClassData = () => {
  const [upcomingClasses, setUpcomingClasses] = useState<ClassPreview[]>([]);
  const [waitlistedClasses, setWaitlistedClasses] = useState<ClassPreview[]>([]);
  const [savedClasses, setSavedClasses] = useState<ClassPreview[]>([]);
  const [pastClasses, setPastClasses] = useState<ClassPreview[]>([]);

  useEffect(() => {
    // Simulate fetching data with dummy content
    const dummyClass: ClassPreview = {
      id: 1,
      title: "Introduction to Pottery",
      instructor: "Sarah Johnson",
      price: 75,
      rating: 4.8,
      images: ["/placeholder.svg"],
      level: "All Levels",
      date: new Date(),
      city: "Stockholm",
      category: "Pottery"
    };

    const dummyWaitlistClass: ClassPreview = {
      id: 2,
      title: "Advanced Baking Techniques",
      instructor: "Michael Chen",
      price: 89,
      rating: 4.9,
      images: ["/placeholder.svg"],
      level: "Intermediate",
      date: new Date(),
      city: "Göteborg",
      category: "Baking"
    };

    const dummySavedClass: ClassPreview = {
      id: 3,
      title: "Watercolor Painting Workshop",
      instructor: "Emma Davis",
      price: 65,
      rating: 4.7,
      images: ["/placeholder.svg"],
      level: "Beginner",
      date: new Date(),
      city: "Malmö",
      category: "Painting & Art"
    };

    const dummyPastClass: ClassPreview = {
      id: 4,
      title: "Candle Making Masterclass",
      instructor: "David Wilson",
      price: 55,
      rating: 4.6,
      images: ["/placeholder.svg"],
      level: "All Levels",
      date: new Date(),
      city: "Uppsala",
      category: "Candle Making"
    };

    setUpcomingClasses([dummyClass]);
    setWaitlistedClasses([dummyWaitlistClass]);
    setSavedClasses([dummySavedClass]);
    setPastClasses([dummyPastClass]);
  }, []);

  return {
    upcomingClasses,
    waitlistedClasses,
    savedClasses,
    pastClasses
  };
};
