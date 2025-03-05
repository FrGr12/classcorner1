
import { useEffect, useState } from 'react';
import { Message } from './types';

export const useTeacherMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<string>('inbox');
  
  useEffect(() => {
    // Mock data for teacher messages without authentication
    const mockMessages: Message[] = [
      {
        id: 1,
        message_content: "Hello, I'm interested in your pottery class. Do you provide all materials?",
        message_type: "inquiry",
        sent_at: "2023-02-25T14:30:00Z",
        is_unread: true,
        status: "unread",
        student_id: "user123",
        instructor_id: "instructor456",
        thread_id: "thread1",
        read_at: null,
        course_id: 101,
        assigned_to: null,
        communication_context: "class_inquiry",
        last_activity_at: "2023-02-25T14:30:00Z",
        profile: {
          id: "user123",
          first_name: "Emma",
          last_name: "Thompson",
          avatar_url: "/instructors/emma-wilson.jpg",
          location: "San Francisco",
          bio: "Art enthusiast looking to develop new skills",
          languages: ["English", "Spanish"]
        },
        course: {
          title: "Introduction to Pottery",
          price: 120,
          duration: "90"
        }
      },
      {
        id: 2,
        message_content: "Your painting class was incredible! When will you offer advanced levels?",
        message_type: "feedback",
        sent_at: "2023-02-24T09:15:00Z",
        is_unread: false,
        status: "read",
        student_id: "user789",
        instructor_id: "instructor456",
        thread_id: "thread2",
        read_at: "2023-02-24T10:30:00Z",
        course_id: 102,
        assigned_to: null,
        communication_context: "feedback",
        last_activity_at: "2023-02-24T10:30:00Z",
        profile: {
          id: "user789",
          first_name: "Michael",
          last_name: "Chen",
          avatar_url: "/instructors/michael-chen.jpg",
          location: "New York",
          bio: "Hobbyist artist exploring different techniques",
          languages: ["English", "Mandarin"]
        },
        course: {
          title: "Beginners Painting",
          price: 95,
          duration: "120"
        }
      },
      {
        id: 3,
        message_content: "Can I get a refund for the photography workshop? I can't attend due to a schedule conflict.",
        message_type: "support",
        sent_at: "2023-02-23T16:45:00Z",
        is_unread: true,
        status: "unread",
        student_id: "user456",
        instructor_id: "instructor456",
        thread_id: "thread3",
        read_at: null,
        course_id: 103,
        assigned_to: null,
        communication_context: "refund_request",
        last_activity_at: "2023-02-23T16:45:00Z",
        profile: {
          id: "user456",
          first_name: "Sarah",
          last_name: "Johnson",
          avatar_url: "/instructors/sarah-johnson.jpg",
          location: "Chicago",
          bio: "Photography enthusiast and traveler",
          languages: ["English", "French"]
        },
        course: {
          title: "Urban Photography",
          price: 150,
          duration: "180"
        }
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendReply = (threadId: string, replyContent: string) => {
    // In a real app, this would send the reply to the API
    console.log(`Sending reply to thread ${threadId}: ${replyContent}`);
    
    // For demo purposes, we'll update the local message state
    setMessages(prevMessages => {
      return prevMessages.map(msg => {
        if (msg.thread_id === threadId) {
          return {
            ...msg,
            is_unread: false,
            status: 'read',
            read_at: new Date().toISOString(),
            last_activity_at: new Date().toISOString()
          };
        }
        return msg;
      });
    });
    
    // Reset the new message
    setNewMessage('');
    
    // Show success toast in a real app
  };

  const getUnreadMessages = () => {
    return messages.filter(msg => msg.is_unread);
  };

  const getSentMessages = () => {
    // In a real app, this would filter messages sent by the current user
    return messages.filter(msg => msg.status === 'read');
  };

  return { 
    messages, 
    loading,
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
