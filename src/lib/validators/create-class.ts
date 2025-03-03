
import * as z from "zod";

// Define a correct status type that matches the database requirements
const ClassStatusEnum = z.enum(["draft", "published", "archived"]);
export type ClassStatus = z.infer<typeof ClassStatusEnum>;

export const CreateClassSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  is_online: z.boolean().default(false),
  capacity: z.number().int().positive().default(1),
  price: z.number().nonnegative().default(0),
  // Always store duration as string to match database requirements
  duration: z.string().default("60"),
  sessions: z.array(z.any()).default([]),
  learning_outcomes: z.array(z.string()).default(['']),
  requirements: z.array(z.string()).default(['']),
  items_to_bring: z.array(z.string()).default(['']),
  images: z.array(z.any()).default([]),
  status: ClassStatusEnum.default("draft"),
  // Add min/max participants for consistency
  maxParticipants: z.number().int().positive().optional(),
  minParticipants: z.number().int().positive().optional()
});

export type CreateClassFormValues = z.infer<typeof CreateClassSchema>;
