
import { ClassItem } from "@/types/class";

export const potteryClasses: ClassItem[] = [
  {
    id: 1,
    title: "Introduction to Pottery",
    instructor: "Sarah Johnson",
    instructor_id: "pottery-1",
    price: 75,
    rating: 4.8,
    images: [],
    level: "Beginner",
    date: [
      new Date("2024-02-15"),
      new Date("2024-02-22"),
      new Date("2024-02-29")
    ],
    city: "London",
    category: "Pottery"
  },
  {
    id: 2,
    title: "Wheel Throwing Workshop",
    instructor: "Michael Chen",
    instructor_id: "pottery-2",
    price: 90,
    rating: 4.9,
    images: [],
    level: "Intermediate",
    date: [
      new Date("2024-02-20"),
      new Date("2024-02-27"),
      new Date("2024-03-05")
    ],
    city: "Manchester",
    category: "Pottery"
  }
];
