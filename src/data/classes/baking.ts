
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
    category: "Baking",
    description: "Learn how to make delicious sourdough bread from scratch. This workshop covers starter cultivation, dough preparation, and baking techniques."
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
    category: "Baking",
    description: "Master the art of French pastry in this hands-on workshop. You'll learn to make croissants, pain au chocolat, and other classic pastries."
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
    category: "Baking",
    description: "This workshop introduces you to artisan bread making techniques. Learn to create rustic loaves with beautiful crusts and complex flavors."
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
    category: "Baking",
    description: "Take your pastry skills to the next level with advanced techniques. This class covers laminated doughs, complex fillings, and decorative finishes."
  }
];

export const baking = bakingClasses;
