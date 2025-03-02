
// Define a local ClassItemLocal type that matches what we're using
export interface ClassItemLocal {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  capacity: {
    total: number;
    booked: number;
  };
  image?: string;
  status: "active" | "draft" | "completed" | "cancelled";
  waitlist?: number;
  // Adding missing properties to match ClassItem
  instructor: string;
  rating: number;
  images: string[];
  level: string;
  city: string;
}
