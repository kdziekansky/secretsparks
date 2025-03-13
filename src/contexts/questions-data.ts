
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
      
      // Zachowaj oryginalną ścieżkę bez dodatkowego kodowania
      // KLUCZOWA ZMIANA: Nie enkodujemy ścieżek, ponieważ to powoduje problemy
      return question;
    } catch (error) {
      console.error("Error processing image path:", question.illustration, error);
      return question;
    }
  });
};

// Logujemy pierwotne ścieżki do debugowania
console.log("Original image paths examples:", 
  questionsHeteroMale.slice(0, 2).map(q => q.illustration),
  questionsHeteroFemale.slice(0, 2).map(q => q.illustration),
  questionsAdditional.slice(0, 2).map(q => q.illustration)
);

// Łączymy wszystkie pytania w jedną tablicę, ale bez enkodowania
export const questions: Question[] = [
  ...questionsHeteroMale,
  ...questionsHeteroFemale,
  ...questionsAdditional
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
