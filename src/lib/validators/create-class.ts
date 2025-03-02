
import * as z from "zod";

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
  duration: z.string().default("60"), // Force string type to match DB schema
  sessions: z.array(z.any()).default([]),
  learning_outcomes: z.array(z.string()).default(['']),
  requirements: z.array(z.string()).default(['']),
  items_to_bring: z.array(z.string()).default(['']),
  images: z.array(z.any()).default([]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type CreateClassFormValues = z.infer<typeof CreateClassSchema>;
