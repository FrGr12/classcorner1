import { ClassItem } from "@/types/class";

export const bakingClasses: ClassItem[] = [
  {
    id: 1,
    title: "Sourdough Bread Making",
    instructor: "Emma Baker",
    price: 89,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-15'),
    city: "Stockholm",
    category: "Baking"
  },
  {
    id: 2,
    title: "French Pastry Basics",
    instructor: "Pierre Laurent",
    price: 99,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    date: new Date('2024-04-20'),
    city: "Malmö",
    category: "Baking"
  },
  {
    id: 3,
    title: "Artisan Bread Workshop",
    instructor: "Sofia Andersson",
    price: 95,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    date: new Date('2024-04-25'),
    city: "Göteborg",
    category: "Baking"
  },
  {
    id: 4,
    title: "Advanced Pastry Techniques",
    instructor: "Marie Dubois",
    price: 129,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    date: new Date('2024-05-01'),
    city: "Stockholm",
    category: "Baking"
  }
];
