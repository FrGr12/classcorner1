import { ClassItem } from "@/types/class";

export const ceramicsClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Introduction to Pottery", 
    instructor: "Jane Smith", 
    price: 89, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Pottery",
    date: [
      new Date('2024-04-15'),
      new Date('2024-04-22'),
      new Date('2024-04-29'),
      new Date('2024-05-06')
    ],
    city: "Stockholm",
    description: "An introduction to pottery basics. You'll learn hand-building techniques, basic wheel throwing, and glazing methods."
  },
  { 
    id: 2, 
    title: "Wheel Throwing Basics", 
    instructor: "Mike Johnson", 
    price: 99, 
    rating: 4.7, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Pottery",
    date: new Date('2024-04-18'),
    city: "Gothenburg",
    description: "Learn the fundamental techniques of wheel throwing. This class covers centering clay, shaping cylinders, and creating basic forms."
  },
  { 
    id: 3, 
    title: "Advanced Ceramic Sculpture", 
    instructor: "Sarah Lee", 
    price: 129, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    category: "Pottery",
    date: new Date('2024-04-22'),
    city: "Malmö",
    description: "Explore advanced techniques in ceramic sculpture. This class focuses on creating complex forms, surface textures, and mixed media elements."
  },
  { 
    id: 4, 
    title: "Glazing Techniques", 
    instructor: "Tom Wilson", 
    price: 79, 
    rating: 4.6, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    category: "Pottery",
    date: new Date('2024-04-30'),
    city: "Uppsala",
    description: "Master the art of glazing with a variety of techniques. Learn about glaze chemistry, application methods, and firing processes."
  },
  { 
    id: 5, 
    title: "Hand Building Workshop", 
    instructor: "Emma Davis", 
    price: 69, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Pottery",
    date: new Date('2024-05-05'),
    city: "Stockholm",
    description: "Discover the joy of hand building with clay. This workshop covers pinch pots, coil building, and slab construction techniques."
  },
  { 
    id: 6, 
    title: "Decorative Pottery", 
    instructor: "Chris Brown", 
    price: 89, 
    rating: 4.7, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Intermediate",
    category: "Pottery",
    date: new Date('2024-05-10'),
    city: "Gothenburg",
    description: "Learn decorative techniques to enhance your pottery. This class covers carving, stamping, and adding texture to clay surfaces."
  },
  { 
    id: 7, 
    title: "Raku Firing Workshop", 
    instructor: "Lisa Chen", 
    price: 149, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Advanced",
    category: "Pottery",
    date: new Date('2024-05-15'),
    city: "Malmö",
    description: "Experience the excitement of Raku firing. This workshop covers the Raku process, including glazing, firing, and post-firing reduction techniques."
  },
  { 
    id: 8, 
    title: "Clay Modeling Basics", 
    instructor: "David Kim", 
    price: 59, 
    rating: 4.5, 
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    level: "Beginner",
    category: "Pottery",
    date: new Date('2024-05-20'),
    city: "Stockholm",
    description: "Get started with clay modeling. This class introduces basic sculpting techniques, including additive and subtractive methods."
  },
];

export const ceramics = ceramicsClasses;
