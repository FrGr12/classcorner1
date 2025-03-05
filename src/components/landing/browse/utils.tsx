
import React from 'react';
import type { ClassItem } from "@/types/class";
import { mockClasses } from "@/data/mockClasses";

export const searchClasses = (searchInput: string) => {
  const allTitles = new Set<string>();
  const allCategories = new Set<string>();
  
  Object.entries(mockClasses).forEach(([category, classes]: [string, ClassItem[]]) => {
    if (category.toLowerCase().includes(searchInput.toLowerCase())) {
      allCategories.add(category);
    }
    
    classes.forEach(classItem => {
      if (classItem.title.toLowerCase().includes(searchInput.toLowerCase())) {
        allTitles.add(classItem.title);
      }
    });
  });

  return {
    categories: Array.from(allCategories),
    titles: Array.from(allTitles).slice(0, 5)
  };
};

export const highlightMatch = (text: string, searchInput: string): React.ReactNode => {
  if (!searchInput) return text;
  const regex = new RegExp(`(${searchInput})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-accent-purple/10 text-accent-purple">{part}</span>
        ) : part
      )}
    </span>
  );
};
