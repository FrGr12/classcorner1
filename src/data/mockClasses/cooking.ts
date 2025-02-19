
import { ClassItem } from "@/types/class";

export const cookingClasses: ClassItem[] = [
  {
    id: 3,
    title: "Italian Pasta Making",
    instructor: "Marco Rossi",
    instructor_id: "cooking-1",
    price: 65,
    rating: 4.7,
    images: [],
    level: "Beginner",
    date: new Date("2024-02-18"),
    city: "Birmingham",
    category: "Cooking"
  },
  {
    id: 4,
    title: "Asian Fusion Cuisine",
    instructor: "Lisa Wong",
    instructor_id: "cooking-2",
    price: 85,
    rating: 4.6,
    images: [],
    level: "Intermediate",
    date: [
      new Date("2024-02-22"),
      new Date("2024-03-01"),
      new Date("2024-03-08")
    ],
    city: "Leeds",
    category: "Cooking"
  }
];
