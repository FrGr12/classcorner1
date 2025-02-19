
import { z } from "zod";

export const duplicateClassFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  minParticipants: z.coerce.number().min(0, "Minimum participants must be 0 or greater"),
  maxParticipants: z.coerce.number().min(0, "Maximum participants must be 0 or greater"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  date: z.string().optional(),
  time: z.string().optional(),
  whatToBring: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
});

export type DuplicateClassFormData = z.infer<typeof duplicateClassFormSchema>;
