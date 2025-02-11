
export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  tags: string[];
  last_interaction: string;
  total_bookings: number;
  average_rating: number | null;
  location?: string;
  notes?: string;
  languages?: string[];
}
