export interface ClassItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  category?: string;
  date: Date;
  city: string;
}

export interface ClassData {
  [key: string]: ClassItem[];
}