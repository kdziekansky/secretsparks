
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// Dostępne języki
export const LANGUAGES = [
  { code: 'pl', name: 'Polski' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' }
];

// Interfejs dla kontekstu
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  languages: typeof LANGUAGES;
}

// Utworzenie kontekstu
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Właściwości dla providera
interface LanguageProviderProps {
  children: ReactNode;
}

// Provider zarządzający językiem
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'pl');

  useEffect(() => {
    // Aktualizacja stanu, gdy zmieni się język
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    // Nasłuchiwanie na zmianę języka
    i18n.on('languageChanged', handleLanguageChanged);

    // Czyszczenie nasłuchiwania
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Funkcja do zmiany języka
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Wartość kontekstu
  const value = {
    currentLanguage,
    changeLanguage,
    languages: LANGUAGES
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook do łatwego używania kontekstu
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
