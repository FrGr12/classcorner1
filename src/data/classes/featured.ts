
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
    description: "Learn the basics of pottery with expert instructor Jane Smith in this hands-on workshop."
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
    description: "Develop advanced oil painting techniques with master artist Robert Ross."
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
    description: "Learn to prepare authentic Italian dishes with Chef Marco Rossi."
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
    description: "Master the art of portrait photography with professional photographer Sarah Lee."
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
    description: "Learn essential woodworking skills and create your own wooden project."
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
    description: "Design and create your own unique silver ring in this hands-on jewelry workshop."
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
    description: "Create complex ceramic sculptures with advanced techniques and expert guidance."
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
    description: "Paint beautiful watercolor landscapes with guidance from professional artist Maria Chen."
  },
];

// Export for compatibility with mockClasses.ts
export const featured = featuredClasses;
