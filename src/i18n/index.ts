
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importujemy pliki tłumaczeń
import translationPL from "./locales/pl/translation.json";
import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

// Zasoby językowe
const resources = {
  pl: {
    translation: translationPL
  },
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  }
};

i18n
  .use(LanguageDetector) // Detektor języka przeglądarki
  .use(initReactI18next) // Inicjalizujemy moduł react-i18next
  .init({
    resources,
    fallbackLng: "pl", // Domyślny język na wypadek problemów
    debug: process.env.NODE_ENV === "development",
    
    interpolation: {
      escapeValue: false // React już zapobiega atakom XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
