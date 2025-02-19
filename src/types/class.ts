
export interface ClassItem {
  id: number;
  title: string;
  instructor: string;
  instructor_id?: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  category?: string;
  date: Date | Date[];
  city: string;
  maxParticipants?: number;
  waitlist_enabled?: boolean;
  max_waitlist_size?: number;
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
  basePriceGroup?: number;
  basePricePrivate?: number;
  duration?: string;
  shareCount?: number;
  lastShared?: string;
  views?: number;
  saves?: number;
  adClicks?: number;
  instructorEmail?: string;
  instructorPhone?: string;
}

export interface ClassData {
  [key: string]: ClassItem[];
}
