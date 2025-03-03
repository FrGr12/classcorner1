
import { ClassItem } from "@/types/class";

export const photographyClasses: ClassItem[] = [
  {
    id: 1,
    title: "DSLR Photography Basics",
    instructor: "Alex Lens",
    price: 129,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-16'),
    city: "Stockholm",
    description: "Master the fundamentals of DSLR photography including exposure, composition, and camera settings."
  },
  {
    id: 2,
    title: "Portrait Photography",
    instructor: "Sarah Frame",
    price: 149,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    date: new Date('2024-04-23'),
    city: "Gothenburg",
    description: "Learn advanced techniques for capturing stunning portraits with natural and artificial lighting."
  },
];

export const photography = photographyClasses;
