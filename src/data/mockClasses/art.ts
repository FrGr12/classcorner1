
import { ClassItem } from "@/types/class";

export const artClasses: ClassItem[] = [
  {
    id: 5,
    title: "Watercolor Basics",
    instructor: "Emma Thompson",
    instructor_id: "art-1",
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
    instructor_id: "art-2",
    price: 95,
    rating: 4.9,
    images: [],
    level: "Advanced",
    date: [new Date("2024-02-28"), new Date("2024-03-07")],
    city: "Edinburgh",
    category: "Painting & Art"
  }
];
