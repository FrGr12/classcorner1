
import { ClassItem } from "@/types/class";

export const textileClasses: ClassItem[] = [
  {
    id: 1,
    title: "Knitting for Beginners",
    instructor: "Sarah Yarn",
    price: 59,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-23'),
    city: "Stockholm",
    description: "Learn the basics of knitting in this welcoming class for complete beginners."
  },
  {
    id: 2,
    title: "Advanced Weaving",
    instructor: "Lisa Thread",
    price: 79,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    date: new Date('2024-04-30'),
    city: "Malmö",
    description: "Take your weaving skills to the next level with advanced techniques and patterns."
  },
];

// Export for compatibility with mockClasses.ts
export const textile = textileClasses;
