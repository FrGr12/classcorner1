import { ClassItem } from "@/types/class";

export const cocktailClasses: ClassItem[] = [
  {
    id: 1,
    title: "Mixology Fundamentals",
    instructor: "Tom Collins",
    price: 79,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Cocktail & Wine",
    date: new Date('2024-04-18'),
    city: "Stockholm"
  },
  {
    id: 2,
    title: "Wine Tasting Workshop",
    instructor: "Sofia Vine",
    price: 89,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Cocktail & Wine",
    date: new Date('2024-04-25'),
    city: "Gothenburg"
  },
];
