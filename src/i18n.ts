
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import plików tłumaczeń
import plTranslation from './translations/pl';
import enTranslation from './translations/en';
import deTranslation from './translations/de';

// Konfiguracja i18next
i18n
  // Wykrywanie języka przeglądarki
  .use(LanguageDetector)
  // Inicjalizacja react-i18next
  .use(initReactI18next)
  // Konfiguracja i18next
  .init({
    resources: {
      pl: {
        translation: plTranslation
      },
      en: {
        translation: enTranslation
      },
      de: {
        translation: deTranslation
      }
    },
    fallbackLng: 'pl',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // nie jest potrzebne w React
    },
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
