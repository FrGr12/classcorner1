
import { ClassItem } from "@/types/class";

export const flowerClasses: ClassItem[] = [
  {
    id: 1,
    title: "Flower Arrangement",
    instructor: "Rose Garden",
    price: 79,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-25'),
    city: "Stockholm",
    description: "Learn how to create stunning flower arrangements with professional florist Rose Garden."
  },
  {
    id: 2,
    title: "Plant Care Basics",
    instructor: "Flora Green",
    price: 69,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-05-02'),
    city: "Uppsala",
    description: "Master the essentials of indoor and outdoor plant care in this informative workshop."
  },
];

// Export for compatibility with mockClasses.ts
export const flower = flowerClasses;
