import { ClassItem } from "@/types/class";

export const cookingClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Italian Cuisine Basics", 
    instructor: "Marco Rossi", 
    price: 99, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Beginner",
    date: new Date('2024-04-25')
  },
  { 
    id: 2, 
    title: "Advanced Pastry Making", 
    instructor: "Sophie Laurent", 
    price: 129, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Advanced",
    date: new Date('2024-05-01')
  },
];
