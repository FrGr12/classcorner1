
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/notification';

export const useNotifications = (limit?: number) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      user_id: "123",
      notification_type: "booking_confirmation",
      content: "Your booking for Advanced Pottery Workshop has been confirmed!",
      status: "unread",
      category: "bookings",
      created_at: new Date().toISOString(),
      read_at: null,
      reference_id: "1"
    },
    {
      id: "2",
      user_id: "123",
      notification_type: "class_reminder",
      content: "Reminder: Your Watercolor Painting Basics class starts tomorrow at 10 AM",
      status: "unread",
      category: "messages",
      created_at: new Date().toISOString(),
      read_at: null,
      reference_id: "2"
    },
    {
      id: "3",
      user_id: "123",
      notification_type: "waitlist",
      content: "Good news! A spot has opened up in the Jewelry Making Workshop",
      status: "unread",
      category: "waitlist",
      created_at: new Date().toISOString(),
      read_at: null,
      reference_id: "3"
    },
    {
      id: "4",
      user_id: "123",
      notification_type: "promotion",
      content: "Special offer: 20% off on all pottery classes this week!",
      status: "unread",
      category: "offers",
      created_at: new Date().toISOString(),
      read_at: null,
      reference_id: "4"
    },
    {
      id: "5",
      user_id: "123",
      notification_type: "review_reminder",
      content: "Don't forget to leave a review for your recent pottery class!",
      status: "read",
      category: "messages",
      created_at: new Date().toISOString(),
      read_at: new Date().toISOString(),
      reference_id: "5"
    }
  ]);

  const markAsRead = async (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read_at: new Date().toISOString() }
          : notification
      )
    );
    return Promise.resolve();
  };

  return {
    notifications: limit ? notifications.slice(0, limit) : notifications,
    markAsRead,
  };
};
