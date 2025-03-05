
import { ClassItemLocal } from "./types";

// Mock data for classes with all required properties
export const mockClasses: ClassItemLocal[] = [
  {
    id: 1,
    title: "Introduction to Pottery",
    category: "Pottery",
    date: "2023-07-15",
    time: "10:00 AM",
    duration: "2 hours",
    location: "Studio A",
    price: 75,
    capacity: {
      total: 10,
      booked: 8
    },
    status: "active",
    waitlist: 3,
    instructor: "Jane Doe",
    rating: 4.8,
    images: ["/placeholder.svg"],
    level: "Beginner",
    city: "Stockholm"
  },
  {
    id: 2,
    title: "Watercolor Basics",
    category: "Painting",
    date: "2023-07-18",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Studio B",
    price: 60,
    capacity: {
      total: 12,
      booked: 6
    },
    status: "active",
    instructor: "John Smith",
    rating: 4.5,
    images: ["/placeholder.svg"],
    level: "Beginner",
    city: "Stockholm"
  },
  {
    id: 3,
    title: "Advanced Pottery Techniques",
    category: "Pottery",
    date: "2023-07-25",
    time: "1:00 PM",
    duration: "4 hours",
    location: "Studio A",
    price: 120,
    capacity: {
      total: 8,
      booked: 3
    },
    status: "draft",
    instructor: "Jane Doe",
    rating: 4.9,
    images: ["/placeholder.svg"],
    level: "Advanced",
    city: "Stockholm"
  }
];
