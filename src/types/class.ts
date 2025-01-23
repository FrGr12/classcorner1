export interface ClassItem {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  category?: string;
  date: Date | Date[];
  city: string;
  waitlist_enabled?: boolean;
  max_waitlist_size?: number;
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
  basePriceGroup?: number;
  basePricePrivate?: number;
}

export interface ClassData {
  [key: string]: ClassItem[];
}