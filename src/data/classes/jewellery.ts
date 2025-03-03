
import { ClassItem } from "@/types/class";

export const jewelleryClasses: ClassItem[] = [
  {
    id: 1,
    title: "Silver Ring Making",
    instructor: "Emma Silver",
    price: 89,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-22'),
    city: "Stockholm",
    description: "Create your own beautiful silver ring in this hands-on jewelry making workshop."
  },
  {
    id: 2,
    title: "Metal Smithing",
    instructor: "James Gold",
    price: 109,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    date: new Date('2024-04-29'),
    city: "Gothenburg",
    description: "Explore metal smithing techniques and create unique jewelry pieces in this intermediate class."
  },
];

// Export for compatibility with mockClasses.ts
export const jewellery = jewelleryClasses;
