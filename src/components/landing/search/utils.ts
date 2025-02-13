
import { mockClasses } from "@/data/mockClasses";

export const getAllClassTitles = () => {
  const titles: string[] = [];
  Object.values(mockClasses).forEach(classes => {
    classes.forEach(classItem => {
      titles.push(classItem.title);
    });
  });
  return [...new Set(titles)];
};
