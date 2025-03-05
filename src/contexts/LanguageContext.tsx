
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'sv';

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Define props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Create language provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get initial language from localStorage if available, otherwise use browser language or default to English
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'sv'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === 'sv' ? 'sv' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.ts`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if translations fail to load
        if (language !== 'en') {
          const englishModule = await import('../translations/en.ts');
          setTranslations(englishModule.default);
        }
      }
    };

    loadTranslations();
    
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
