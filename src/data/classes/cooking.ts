import { ClassItem } from "@/types/class";

export const cookingClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Italian Cuisine Basics", 
    instructor: "Marco Rossi", 
    price: 99, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Cooking",
    date: new Date('2024-04-25'),
    city: "Stockholm"
  },
  { 
    id: 2, 
    title: "Nordic Food Workshop", 
    instructor: "Erik Larsson", 
    price: 129, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    category: "Cooking",
    date: new Date('2024-05-01'),
    city: "Malmö"
  }
];
