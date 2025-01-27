import { ClassItem } from "@/types/class";

const mockClasses: Record<string, ClassItem[]> = {
  "Pottery": [
    {
      id: 1,
      title: "Introduction to Pottery",
      instructor: "Sarah Johnson",
      price: 75,
      rating: 4.8,
      images: [],
      level: "Beginner",
      date: new Date("2024-02-15"),
      city: "London",
      category: "Pottery"
    },
    {
      id: 2,
      title: "Wheel Throwing Workshop",
      instructor: "Michael Chen",
      price: 90,
      rating: 4.9,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-02-20"), new Date("2024-02-27")],
      city: "Manchester",
      category: "Pottery"
    }
  ],
  "Cooking": [
    {
      id: 3,
      title: "Italian Pasta Making",
      instructor: "Marco Rossi",
      price: 65,
      rating: 4.7,
      images: [],
      level: "Beginner",
      date: new Date("2024-02-18"),
      city: "Birmingham",
      category: "Cooking"
    },
    {
      id: 4,
      title: "Asian Fusion Cuisine",
      instructor: "Lisa Wong",
      price: 85,
      rating: 4.6,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-02-22"), new Date("2024-03-01")],
      city: "Leeds",
      category: "Cooking"
    }
  ],
  "Painting & Art": [
    {
      id: 5,
      title: "Watercolor Basics",
      instructor: "Emma Thompson",
      price: 60,
      rating: 4.5,
      images: [],
      level: "Beginner",
      date: new Date("2024-02-25"),
      city: "Bristol",
      category: "Painting & Art"
    },
    {
      id: 6,
      title: "Oil Painting Masterclass",
      instructor: "David Wilson",
      price: 95,
      rating: 4.9,
      images: [],
      level: "Advanced",
      date: [new Date("2024-02-28"), new Date("2024-03-07")],
      city: "Edinburgh",
      category: "Painting & Art"
    }
  ],
  "Photography": [
    {
      id: 7,
      title: "DSLR Photography Basics",
      instructor: "James Miller",
      price: 70,
      rating: 4.6,
      images: [],
      level: "Beginner",
      date: new Date("2024-03-02"),
      city: "Glasgow",
      category: "Photography"
    },
    {
      id: 8,
      title: "Street Photography Workshop",
      instructor: "Sophie Clark",
      price: 80,
      rating: 4.7,
      images: [],
      level: "Intermediate",
      date: [new Date("2024-03-05"), new Date("2024-03-12")],
      city: "Liverpool",
      category: "Photography"
    }
  ]
};

export { mockClasses };