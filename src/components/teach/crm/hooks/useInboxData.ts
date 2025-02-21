
import { useQuery } from "@tanstack/react-query";
import { Message } from "../types";

export const useInboxData = (selectedMessageId: string | null) => {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const dummyMessages: Message[] = [
        {
          id: 1,
          message_type: "inquiry",
          message_content: "Hi, I'm interested in your pottery class. Could you tell me more about the materials we'll be using?",
          sent_at: new Date().toISOString(),
          read_at: null,
          status: "unread",
          student_id: "1",
          course_id: 1,
          instructor_id: "dummy-instructor",
          thread_id: "thread1",
          is_unread: true,
          assigned_to: null,
          communication_context: "Pottery Class Inquiry",
          last_activity_at: new Date().toISOString(),
          profile: {
            id: "1",
            first_name: "Emma",
            last_name: "Watson",
            avatar_url: null,
            location: "Stockholm",
            bio: "Art enthusiast looking to explore new creative outlets",
            languages: ["English", "Swedish"],
            tags: ["Beginner", "Pottery Interest", "Workshop"]
          },
          course: {
            title: "Introduction to Pottery",
            price: 1200,
            duration: "2 hours"
          }
        },
        {
          id: 2,
          message_type: "feedback",
          message_content: "The woodworking class was amazing! I learned so much about different types of wood and techniques.",
          sent_at: new Date(Date.now() - 86400000).toISOString(),
          read_at: new Date(Date.now() - 43200000).toISOString(),
          status: "read",
          student_id: "2",
          course_id: 2,
          instructor_id: "dummy-instructor",
          thread_id: "thread2",
          is_unread: false,
          assigned_to: null,
          communication_context: "Woodworking Class Feedback",
          last_activity_at: new Date(Date.now() - 43200000).toISOString(),
          profile: {
            id: "2",
            first_name: "James",
            last_name: "Smith",
            avatar_url: null,
            location: "Gothenburg",
            bio: "DIY enthusiast and weekend warrior",
            languages: ["English"],
            tags: ["Advanced", "Returning Student", "DIY"]
          },
          course: {
            title: "Advanced Woodworking",
            price: 1500,
            duration: "3 hours"
          }
        },
        {
          id: 3,
          message_type: "question",
          message_content: "Do we need to bring our own canvas for the painting workshop?",
          sent_at: new Date(Date.now() - 172800000).toISOString(),
          read_at: null,
          status: "unread",
          student_id: "3",
          course_id: 3,
          instructor_id: "dummy-instructor",
          thread_id: "thread3",
          is_unread: true,
          assigned_to: null,
          communication_context: "Painting Workshop Materials",
          last_activity_at: new Date(Date.now() - 172800000).toISOString(),
          profile: {
            id: "3",
            first_name: "Sofia",
            last_name: "Andersson",
            avatar_url: null,
            location: "Uppsala",
            bio: "Aspiring artist with a passion for colors",
            languages: ["Swedish", "English", "Spanish"],
            tags: ["New Student", "Art Interest", "Painting"]
          },
          course: {
            title: "Oil Painting Basics",
            price: 900,
            duration: "2.5 hours"
          }
        }
      ];
      return dummyMessages;
    }
  });

  const { data: studentBookings } = useQuery({
    queryKey: ["bookings", selectedMessageId],
    enabled: !!selectedMessageId,
    queryFn: async () => {
      return [
        {
          id: 1,
          course: {
            title: "Introduction to Pottery",
            price: 75,
            duration: 120
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
          status: "confirmed"
        },
        {
          id: 2,
          course: {
            title: "Advanced Pottery Techniques",
            price: 90,
            duration: 180
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
          status: "completed"
        },
        {
          id: 3,
          course: {
            title: "Sculpture Workshop",
            price: 85,
            duration: 240
          },
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
          status: "completed"
        }
      ];
    }
  });

  return { messages, studentBookings };
};
