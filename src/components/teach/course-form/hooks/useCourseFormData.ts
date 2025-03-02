
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "../utils/formDefaults";
import { CourseFormValues } from "../CourseFormContext";

export const useCourseFormData = (courseId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call to fetch course data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock response data
        const mockCourseData = {
          id: parseInt(courseId),
          title: "Ceramic Pottery Workshop",
          description: "Learn the basics of pottery in this hands-on workshop",
          category: "Crafts",
          location: "Studio",
          locationType: "inPerson",
          address: "123 Main St",
          city: "Stockholm",
          state: "Stockholm",
          zipCode: "10044",
          onlineLink: "",
          classDetails: "Bring your creativity and enthusiasm!",
          difficultyLevel: "beginner",
          price: "299",
          capacity: "8",
          minParticipants: 2,
          maxParticipants: 8,
          images: ["/placeholder.svg"],
          scheduleType: "oneTime",
          startDate: "2023-08-15",
          endDate: "2023-08-15",
          startTime: "14:00",
          endTime: "17:00",
          recurringDays: [],
          whatToBring: ["Apron", "Notebook"],
          learningOutcomes: ["Basic pottery techniques", "Glazing fundamentals"],
          auto_promote_from_waitlist: true,
          auto_send_waitlist_notification: true,
          base_price_group: 200,
          base_price_private: 350,
          booking_deadline_hours: 24,
          cancellation_policy: "24-hour notice required for refunds",
          session_length_minutes: 180,
          waitlist_enabled: true,
          max_waitlist_size: 5,
        };

        form.reset({
          title: mockCourseData.title,
          description: mockCourseData.description,
          category: mockCourseData.category,
          location: mockCourseData.location,
          locationType: mockCourseData.locationType,
          address: mockCourseData.address,
          city: mockCourseData.city,
          state: mockCourseData.state,
          zipCode: mockCourseData.zipCode,
          onlineLink: mockCourseData.onlineLink,
          classDetails: mockCourseData.classDetails,
          difficultyLevel: mockCourseData.difficultyLevel,
          price: mockCourseData.price,
          capacity: mockCourseData.capacity,
          minParticipants: mockCourseData.minParticipants,
          maxParticipants: mockCourseData.maxParticipants,
          images: mockCourseData.images,
          scheduleType: mockCourseData.scheduleType,
          startDate: mockCourseData.startDate,
          endDate: mockCourseData.endDate,
          startTime: mockCourseData.startTime,
          endTime: mockCourseData.endTime,
          recurringDays: mockCourseData.recurringDays,
          whatToBring: mockCourseData.whatToBring,
          learningOutcomes: mockCourseData.learningOutcomes,
        });
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, form]);

  return {
    form,
    isLoading,
    error,
  };
};
