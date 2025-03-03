
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CourseFormValues } from "../CourseFormContext";
import { Session } from "@/types/session";

export const useCourseFormData = (form: UseFormReturn<CourseFormValues>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Simulate API call to load course data
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simulate loaded data
        const mockData = {
          title: "Introduction to Pottery",
          description: "Learn the basics of pottery making in this hands-on class.",
          category: "arts-and-crafts",
          location: "studio",
          locationType: "inPerson" as const,
          address: "123 Studio Street",
          city: "Portland",
          state: "OR",
          zipCode: "97201",
          onlineLink: "",
          classDetails: "All materials included. No experience necessary.",
          difficultyLevel: "beginner" as const,
          price: "75",
          capacity: "10",
          minParticipants: 3,
          maxParticipants: 10,
          images: [] as string[],
          scheduleType: "oneTime" as const,
          startDate: "",
          endDate: "",
          startTime: "10:00",
          endTime: "13:00",
          recurringDays: [],
          whatToBring: ["Comfortable clothes", "Water bottle"],
          learningOutcomes: ["Create a small ceramic bowl", "Learn basic glazing techniques"],
        };

        // Reset form with loaded data
        form.reset(mockData);

        // Simulate loading sessions
        const mockSessions = [
          {
            id: 1,
            date: new Date("2023-12-15"),
            start_time: "10:00",
            end_time: "13:00",
          }
        ];
        setSessions(mockSessions);

      } catch (err) {
        console.error("Error loading course data:", err);
        setError("Failed to load course data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Uncomment to load data when component mounts
    // loadInitialData();
  }, [form]);

  return { form, isLoading, error, sessions, setSessions };
};
