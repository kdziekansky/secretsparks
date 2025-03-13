
import { questionsHeteroMale } from './questions/questions-hetero-male';
import { questionsHeteroFemale } from './questions/questions-hetero-female';
import { questionsAdditional } from './questions/questions-additional';
import type { Question } from '@/types/survey';

// Helper do enkodowania ścieżek URL obrazów
const encodeImagePaths = (questions: Question[]): Question[] => {
  return questions.map(question => {
    if (!question.illustration) return question;
    
    try {
      // Nie modyfikuj URL-i, które już mają protokół (np. http, https)
      if (question.illustration.startsWith('http')) return question;
      
      // Nie modyfikuj już zakodowanych ścieżek
      if (question.illustration.includes('%')) return question;
      
      // Usuń podwójne i wielokrotne ukośniki
      let cleanUrl = question.illustration.replace(/\/+/g, '/');
      
      // Standardowa ścieżka dla wszystkich ilustracji
      const fileName = cleanUrl.split('/').pop() || '';
      
      // Dla ścieżek zaczynających się od /lovable-uploads/, przekieruj do /images/illustrations/techniques/
      if (cleanUrl.startsWith('/lovable-uploads/')) {
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(fileName)}`
        };
      }
      
      // Dla ścieżek zaczynających się od /images/, ale bez /illustrations/techniques/
      if (cleanUrl.startsWith('/images/') && !cleanUrl.includes('/illustrations/techniques/')) {
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(fileName)}`
        };
      }
      
      // Zachowaj ścieżki, które już wskazują na właściwy katalog
      if (cleanUrl.includes('/illustrations/techniques/')) {
        return question;
      }
      
      // Dla pozostałych ścieżek, przyjmij, że to nazwa pliku i dodaj odpowiedni katalog
      if (!cleanUrl.startsWith('/')) {
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(cleanUrl)}`
        };
      }
      
      // Dla innych ścieżek, domyślnie dodaj do katalogu techniques
      return {
        ...question,
        illustration: `/images/illustrations/techniques/${encodeURIComponent(fileName)}`
      };
    } catch (error) {
      console.error("Error encoding image path:", question.illustration, error);
      return question;
    }
  });
};

// Zakoduj ścieżki obrazów przed połączeniem pytań
const encodedHeteroMale = encodeImagePaths(questionsHeteroMale);
const encodedHeteroFemale = encodeImagePaths(questionsHeteroFemale);
const encodedAdditional = encodeImagePaths(questionsAdditional);

// Log zakodowanych ścieżek do debugowania
console.log("Encoded image paths examples:", 
  encodedHeteroMale.slice(0, 2).map(q => q.illustration),
  encodedHeteroFemale.slice(0, 2).map(q => q.illustration),
  encodedAdditional.slice(0, 2).map(q => q.illustration)
);

// Łączymy wszystkie pytania w jedną tablicę
export const questions: Question[] = [
  ...encodedHeteroMale,
  ...encodedHeteroFemale,
  ...encodedAdditional
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
