
import { ClassItem } from "@/types/class";

export const featuredClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Introduction to Pottery", 
    instructor: "Jane Smith", 
    price: 89, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Ceramics",
    date: new Date('2024-04-15'),
    city: "Stockholm",
    description: "Learn the basics of pottery with hands-on instruction from an expert. Perfect for beginners."
  },
  { 
    id: 2, 
    title: "Oil Painting Masterclass", 
    instructor: "Robert Ross", 
    price: 99, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    category: "Painting",
    date: new Date('2024-04-20'),
    city: "Gothenburg",
    description: "Take your oil painting skills to the next level with this advanced masterclass."
  },
  { 
    id: 3, 
    title: "Italian Cuisine Basics", 
    instructor: "Marco Rossi", 
    price: 79, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Cooking",
    date: new Date('2024-04-25'),
    city: "Stockholm",
    description: "Learn to create authentic Italian cuisine with traditional recipes and techniques."
  },
  { 
    id: 4, 
    title: "Portrait Photography", 
    instructor: "Sarah Lee", 
    price: 149, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    category: "Photography",
    date: new Date('2024-04-30'),
    city: "Gothenburg",
    description: "Master the art of portrait photography with expert lighting and posing techniques."
  },
  { 
    id: 5, 
    title: "Woodworking Essentials", 
    instructor: "John Wood", 
    price: 129, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Woodworking",
    date: new Date('2024-05-05'),
    city: "Stockholm",
    description: "Get started with woodworking and learn to use essential tools and techniques for beginners."
  },
  { 
    id: 6, 
    title: "Ring Making Workshop", 
    instructor: "Emma Silver", 
    price: 99, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    category: "Jewelry",
    date: new Date('2024-05-10'),
    city: "Gothenburg",
    description: "Create your own custom silver ring in this hands-on metalsmithing workshop."
  },
  { 
    id: 7, 
    title: "Advanced Ceramic Sculpture", 
    instructor: "Tom Wilson", 
    price: 159, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    category: "Ceramics",
    date: new Date('2024-05-15'),
    city: "Stockholm",
    description: "Explore advanced sculptural techniques in clay with a focus on form and texture."
  },
  { 
    id: 8, 
    title: "Watercolor Landscapes", 
    instructor: "Maria Chen", 
    price: 89, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    category: "Painting",
    date: new Date('2024-05-20'),
    city: "Gothenburg",
    description: "Learn to paint beautiful watercolor landscapes with an emphasis on light and atmosphere."
  },
];

export const featured = featuredClasses;
