
export interface ClassItem {
  id: number;
  title: string;
  instructor: string;
  instructor_id?: string;
  price: number;
  rating: number;
  images: string[];
  videoUrl?: string; // New field for video URL
  level: string;
  category?: string;
  date: Date | Date[];
  city: string;
  description?: string; // Making description optional to fix existing data
  maxParticipants?: number;
  minParticipants?: number;
  waitlist_enabled?: boolean;
  max_waitlist_size?: number;
  groupBookingsEnabled?: boolean;
  privateBookingsEnabled?: boolean;
  basePriceGroup?: number;
  basePricePrivate?: number;
  duration?: number | string;
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

export interface ClassPreview {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  images: string[];
  level: string;
  date: Date;
  city: string;
  category?: string;
}
