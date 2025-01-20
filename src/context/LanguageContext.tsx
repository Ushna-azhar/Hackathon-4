'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/translation';

// Define types for language
type Language = 'en' | 'ar' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default language is English

  const translate = (key: string): string => {
    return translations[language][key] || key; // Return the translation if it exists, otherwise return the key itself
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
