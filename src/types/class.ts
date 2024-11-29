export interface ClassItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  category?: string;
}

export interface ClassData {
  [key: string]: ClassItem[];
}