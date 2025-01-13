import { ClassItem } from "@/types/class";

export const paintingClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Oil Painting Fundamentals", 
    instructor: "Robert Ross", 
    price: 79, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    ],
    level: "Beginner",
    date: new Date('2024-04-20'),
    city: "Stockholm"
  },
  { 
    id: 2, 
    title: "Watercolor Techniques", 
    instructor: "Maria Chen", 
    price: 89, 
    rating: 4.7, 
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    ],
    level: "Intermediate",
    date: new Date('2024-04-22'),
    city: "Gothenburg"
  },
];