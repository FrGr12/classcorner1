import { ClassData } from "@/types/class";
import { ceramicsClasses } from "./classes/ceramics";
import { paintingClasses } from "./classes/painting";
import { cookingClasses } from "./classes/cooking";
import { bakingClasses } from "./classes/baking";
import { cocktailClasses } from "./classes/cocktail";
import { photographyClasses } from "./classes/photography";
import { musicClasses } from "./classes/music";
import { candleClasses } from "./classes/candle";
import { woodClasses } from "./classes/wood";
import { jewelleryClasses } from "./classes/jewellery";
import { textileClasses } from "./classes/textile";
import { paperClasses } from "./classes/paper";
import { flowerClasses } from "./classes/flower";

export const mockClasses: ClassData = {
  "Pottery": ceramicsClasses,
  "Painting & Art": paintingClasses,
  "Cooking": cookingClasses,
  "Baking": bakingClasses,
  "Cocktail & Wine": cocktailClasses,
  "Photography": photographyClasses,
  "Music & Dance": musicClasses,
  "Candle Making": candleClasses,
  "Wood Craft": woodClasses,
  "Jewellery & Metal Craft": jewelleryClasses,
  "Textile Craft": textileClasses,
  "Paper Craft": paperClasses,
  "Flower & Plants": flowerClasses,
};