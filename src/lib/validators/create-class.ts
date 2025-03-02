
import * as z from "zod";

export const CreateClassSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  is_online: z.boolean().default(false),
  capacity: z.number().int().positive(),
  price: z.number().nonnegative(),
  duration: z.number().int().positive(),
  sessions: z.array(z.any()),
  learning_outcomes: z.array(z.string()),
  requirements: z.array(z.string()),
  items_to_bring: z.array(z.string()),
  images: z.array(z.any()),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type CreateClassFormValues = z.infer<typeof CreateClassSchema>;
