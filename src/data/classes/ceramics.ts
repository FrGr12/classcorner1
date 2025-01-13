import { ClassItem } from "@/types/class";

export const ceramicsClasses: ClassItem[] = [
  { 
    id: 1, 
    title: "Introduction to Pottery", 
    instructor: "Jane Smith", 
    price: 89, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Beginner",
    date: [
      new Date('2024-04-15'),
      new Date('2024-04-22'),
      new Date('2024-04-29'),
      new Date('2024-05-06')
    ],
    city: "Stockholm"
  },
  { 
    id: 2, 
    title: "Wheel Throwing Basics", 
    instructor: "Mike Johnson", 
    price: 99, 
    rating: 4.7, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Beginner",
    date: new Date('2024-04-18'),
    city: "Gothenburg"
  },
  { 
    id: 3, 
    title: "Advanced Ceramic Sculpture", 
    instructor: "Sarah Lee", 
    price: 129, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Advanced",
    date: new Date('2024-04-22'),
    city: "Malmö"
  },
  { 
    id: 4, 
    title: "Glazing Techniques", 
    instructor: "Tom Wilson", 
    price: 79, 
    rating: 4.6, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Intermediate",
    date: new Date('2024-04-30'),
    city: "Uppsala"
  },
  { 
    id: 5, 
    title: "Hand Building Workshop", 
    instructor: "Emma Davis", 
    price: 69, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Beginner",
    date: new Date('2024-05-05'),
    city: "Stockholm"
  },
  { 
    id: 6, 
    title: "Decorative Pottery", 
    instructor: "Chris Brown", 
    price: 89, 
    rating: 4.7, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Intermediate",
    date: new Date('2024-05-10'),
    city: "Gothenburg"
  },
  { 
    id: 7, 
    title: "Raku Firing Workshop", 
    instructor: "Lisa Chen", 
    price: 149, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Advanced",
    date: new Date('2024-05-15'),
    city: "Malmö"
  },
  { 
    id: 8, 
    title: "Clay Modeling Basics", 
    instructor: "David Kim", 
    price: 59, 
    rating: 4.5, 
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    level: "Beginner",
    date: new Date('2024-05-20'),
    city: "Stockholm"
  },
];
