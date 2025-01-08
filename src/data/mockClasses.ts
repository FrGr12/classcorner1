import { ClassData } from "@/types/class";
import { ceramicsClasses } from "./classes/ceramics";
import { paintingClasses } from "./classes/painting";
import { cookingClasses } from "./classes/cooking";
import { featuredClasses } from "./classes/featured";

export const mockClasses: ClassData = {
  Ceramics: ceramicsClasses,
  Painting: paintingClasses,
  Cooking: cookingClasses,
  featured: featuredClasses,
};