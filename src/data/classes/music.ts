import { ClassItem } from "@/types/class";

export const musicClasses: ClassItem[] = [
  {
    id: 1,
    title: "Guitar for Beginners",
    instructor: "Jack String",
    price: 69,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-17'),
    city: "Stockholm"
  },
  {
    id: 2,
    title: "Latin Dance Basics",
    instructor: "Maria Rhythm",
    price: 59,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-24'),
    city: "Malmö"
  },
];
