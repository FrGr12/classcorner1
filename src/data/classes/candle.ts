
import { ClassItem } from "@/types/class";

export const candleClasses: ClassItem[] = [
  {
    id: 1,
    title: "Soy Candle Making",
    instructor: "Lucy Light",
    price: 69,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Candle Making",
    date: new Date('2024-04-19'),
    city: "Uppsala",
    description: "Learn to make beautiful and eco-friendly soy candles. This workshop covers wax selection, fragrances, coloring, and container choices."
  },
  {
    id: 2,
    title: "Advanced Candle Art",
    instructor: "Ben Wax",
    price: 79,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    category: "Candle Making",
    date: new Date('2024-04-26'),
    city: "Stockholm",
    description: "Take your candle-making skills to the next level with this advanced workshop. Learn layering techniques, embedding objects, and custom molds."
  },
];

export const candle = candleClasses;
