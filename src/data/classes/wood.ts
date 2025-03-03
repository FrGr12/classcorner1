
import { ClassItem } from "@/types/class";

export const woodClasses: ClassItem[] = [
  {
    id: 1,
    title: "Woodworking Basics",
    instructor: "John Cedar",
    price: 99,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-21'),
    city: "Stockholm",
    description: "Learn the fundamentals of woodworking in this hands-on class for beginners."
  },
  {
    id: 2,
    title: "Furniture Making",
    instructor: "Mike Oak",
    price: 129,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    date: new Date('2024-04-28'),
    city: "Gothenburg",
    description: "Create your own furniture piece in this comprehensive woodworking class."
  },
];

// Export for compatibility with mockClasses.ts
export const wood = woodClasses;
