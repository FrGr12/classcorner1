import { ClassItem } from "@/types/class";

export const cookingClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Italian Cuisine Basics", 
    instructor: "Marco Rossi", 
    price: 99, 
    rating: 4.9, 
    images: [],
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
    images: [],
    level: "Advanced",
    category: "Cooking",
    date: new Date('2024-05-01'),
    city: "Malmö"
  }
];