
import { ClassItem } from "@/types/class";

export const paintingClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Oil Painting Fundamentals", 
    instructor: "Robert Ross", 
    price: 79, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-20'),
    city: "Stockholm",
    description: "Master the fundamentals of oil painting with renowned artist Robert Ross."
  },
  { 
    id: 2, 
    title: "Watercolor Techniques", 
    instructor: "Maria Chen", 
    price: 89, 
    rating: 4.7, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    date: new Date('2024-04-22'),
    city: "Gothenburg",
    description: "Explore advanced watercolor techniques and create beautiful paintings with professional artist Maria Chen."
  },
];

// Export for compatibility with mockClasses.ts
export const painting = paintingClasses;
