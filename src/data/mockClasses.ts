
import { baking } from "./classes/baking";
import { candle } from "./classes/candle";
import { ceramics } from "./classes/ceramics";
import { cocktail } from "./classes/cocktail";
import { cooking } from "./classes/cooking";
import { featured } from "./classes/featured";
import { flower } from "./classes/flower";
import { jewellery } from "./classes/jewellery";
import { music } from "./classes/music";
import { painting } from "./classes/painting";
import { paper } from "./classes/paper";
import { photography } from "./classes/photography";
import { textile } from "./classes/textile";
import { wood } from "./classes/wood";
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
