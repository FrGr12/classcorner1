
import { ClassItem } from "@/types/class";

export const paperClasses: ClassItem[] = [
  {
    id: 1,
    title: "Origami Art",
    instructor: "Yuki Paper",
    price: 49,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-24'),
    city: "Stockholm",
    description: "Learn the Japanese art of paper folding to create beautiful origami sculptures and decorations."
  },
  {
    id: 2,
    title: "Paper Quilling",
    instructor: "Anna Craft",
    price: 59,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    date: new Date('2024-05-01'),
    city: "Uppsala",
    description: "Discover the art of paper quilling and create intricate designs using coiled paper strips."
  },
];

export const paper = paperClasses;
