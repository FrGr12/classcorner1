
import { ClassItem } from "@/types/class";

export const photographyClasses: ClassItem[] = [
  {
    id: 7,
    title: "DSLR Photography Basics",
    instructor: "James Miller",
    instructor_id: "photo-1",
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
    instructor_id: "photo-2",
    price: 80,
    rating: 4.7,
    images: [],
    level: "Intermediate",
    date: [new Date("2024-03-05"), new Date("2024-03-12")],
    city: "Liverpool",
    category: "Photography"
  }
];
