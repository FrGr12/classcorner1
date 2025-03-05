
import { useState, useEffect } from "react";
import { Message, MessageTab } from "./types";

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: 1,
    message_content: "Hello, I'm interested in your pottery class. Could you tell me more about the materials provided?",
    message_type: "inquiry",
    sent_at: new Date(Date.now() - 3600000).toISOString(),
    is_unread: true,
    status: "unread",
    student_id: "user-123",
    instructor_id: "teacher-456",
    thread_id: "thread-1",
    profile: {
      first_name: "Emma",
      last_name: "Wilson",
      avatar_url: "/instructors/emma-wilson.jpg",
      id: "user-123"
    },
    course: {
      title: "Introduction to Pottery",
      price: 75
    }
  },
  {
    id: 2,
    message_content: "I'd like to book a private session for my team. Do you offer corporate workshops?",
    message_type: "request",
    sent_at: new Date(Date.now() - 86400000).toISOString(),
    is_unread: false,
    status: "read",
    student_id: "user-456",
    instructor_id: "teacher-456",
    thread_id: "thread-2",
    profile: {
      first_name: "Michael",
      last_name: "Chen",
      avatar_url: "/instructors/michael-chen.jpg",
      id: "user-456"
    },
    course: {
      title: "Watercolor Painting Basics",
      price: 65
    }
  },
  {
    id: 3,
    message_content: "Thank you for the great class yesterday! I've shared some photos of my work on Instagram.",
    message_type: "feedback",
    sent_at: new Date(Date.now() - 259200000).toISOString(),
    is_unread: false,
    status: "read",
    student_id: "user-789",
    instructor_id: "teacher-456",
    thread_id: "thread-3",
    profile: {
      first_name: "Sarah",
      last_name: "Johnson",
      avatar_url: "/instructors/sarah-johnson.jpg",
      id: "user-789"
    },
    course: {
      title: "Advanced Pottery Techniques",
      price: 95
    }
  }
];

export const useTeacherMessages = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<MessageTab>("all");

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendReply = async () => {
    if (!selectedMessage || !newMessage.trim()) return;

    try {
      // Create a new mock reply message
      const replyMessage: Message = {
        id: messages.length + 1,
        message_content: newMessage,
        message_type: "reply",
        sent_at: new Date().toISOString(),
        is_unread: true,
        status: "sent",
        student_id: selectedMessage.student_id,
        instructor_id: "teacher-456", // Current teacher
        thread_id: selectedMessage.thread_id,
        profile: selectedMessage.profile,
        course: selectedMessage.course
      };

      setMessages(prev => [replyMessage, ...prev]);
      setNewMessage("");
      
      // Show success message (would use toast in real app)
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUnreadMessages = () => {
    return messages.filter(msg => msg.status === 'unread');
  };

  const getSentMessages = () => {
    return messages.filter(msg => msg.instructor_id === "teacher-456" && msg.message_type === "reply");
  };

  const getFilteredMessages = () => {
    switch (activeTab) {
      case "unread":
        return getUnreadMessages();
      case "sent":
        return getSentMessages();
      default:
        return messages;
    }
  };

  return {
    loading,
    messages: getFilteredMessages(),
    newMessage,
    setNewMessage,
    selectedMessage,
    setSelectedMessage,
    activeTab,
    setActiveTab,
    handleSendReply,
    getUnreadMessages,
    getSentMessages
  };
};
