
import { CourseFormValues } from "../CourseFormContext";

export const getDefaultFormValues = (): CourseFormValues => {
  return {
    title: '',
    description: '',
    category: '',
    location: '',
    address: '',
    city: '',
    is_online: false,
    capacity: 1,  // Changed from string to number
    price: 0,     // Changed from string to number
    duration: 60,
    sessions: [],
    learning_outcomes: [''],
    requirements: [''],
    items_to_bring: [''],
    images: [],
    status: 'draft',
  };
};

export const getSessionDefaults = () => {
  return {
    date: new Date(),
    start_time: '10:00',
    end_time: '11:00',
    is_recurring: false,
    recurrence_pattern: 'weekly',
    recurrence_end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  };
};
