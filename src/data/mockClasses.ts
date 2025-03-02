
import { bakingClasses, baking } from "./classes/baking";
import { candleClasses, candle } from "./classes/candle";
import { ceramicsClasses, ceramics } from "./classes/ceramics";
import { cocktailClasses, cocktail } from "./classes/cocktail";
import { cookingClasses, cooking } from "./classes/cooking";
import { featuredClasses, featured } from "./classes/featured";
import { flowerClasses, flower } from "./classes/flower";
import { jewelleryClasses, jewellery } from "./classes/jewellery";
import { musicClasses, music } from "./classes/music";
import { paintingClasses, painting } from "./classes/painting";
import { paperClasses, paper } from "./classes/paper";
import { photographyClasses, photography } from "./classes/photography";
import { textileClasses, textile } from "./classes/textile";
import { woodClasses, wood } from "./classes/wood";
import { ClassItem } from "@/types/class";

// Add required description to all mock data
const addDescriptionToItems = (items: any[]): ClassItem[] => {
  return items.map(item => ({
    ...item,
    description: item.description || `Learn about ${item.title} with ${item.instructor} in ${item.city}.`
  }));
};

export const classes = {
  featured: addDescriptionToItems(featured),
  ceramics: addDescriptionToItems(ceramics),
  cooking: addDescriptionToItems(cooking),
  baking: addDescriptionToItems(baking),
  cocktail: addDescriptionToItems(cocktail),
  candle: addDescriptionToItems(candle),
  flower: addDescriptionToItems(flower),
  jewellery: addDescriptionToItems(jewellery),
  music: addDescriptionToItems(music),
  painting: addDescriptionToItems(painting),
  paper: addDescriptionToItems(paper),
  photography: addDescriptionToItems(photography),
  textile: addDescriptionToItems(textile),
  wood: addDescriptionToItems(wood)
};

export const mockClasses = classes;
