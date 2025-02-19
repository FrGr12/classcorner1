
import { ClassItem } from "@/types/class";
import { potteryClasses } from "./pottery";
import { cookingClasses } from "./cooking";
import { artClasses } from "./art";
import { photographyClasses } from "./photography";

export const mockClasses: Record<string, ClassItem[]> = {
  "Pottery": potteryClasses,
  "Cooking": cookingClasses,
  "Painting & Art": artClasses,
  "Photography": photographyClasses
};

export default mockClasses;
