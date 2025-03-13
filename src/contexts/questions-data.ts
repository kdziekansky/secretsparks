
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
      
      // Sprawdź, czy plik jest SVG - wtedy użyj bezpośrednio pliku SVG z folderu
      if (question.illustration.includes('.svg')) {
        // Wyczyść ścieżkę do pliku SVG
        const fileName = question.illustration.split('/').pop() || '';
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${fileName}`
        };
      }
      
      // Jeśli mamy do czynienia z obrazem przesłanym przez użytkownika
      if (question.illustration.includes('/lovable-uploads/')) {
        return question;
      }
      
      // Obsługa specjalnych przypadków dla edgingu
      if (question.id === 'edg-m1' || question.id === 'edg-f1') {
        return {
          ...question,
          illustration: '/images/illustrations/techniques/eding-him.svg'
        };
      }
      
      if (question.id === 'edg-m2' || question.id === 'edg-f2') {
        return {
          ...question,
          illustration: '/images/illustrations/techniques/edging-her.svg'
        };
      }
      
      // Usuń podwójne i wielokrotne ukośniki
      let cleanUrl = question.illustration.replace(/\/+/g, '/');
      
      // Standardowa ścieżka dla wszystkich ilustracji
      const fileName = cleanUrl.split('/').pop() || '';
      
      // Zawsze używamy ścieżki /images/illustrations/techniques/
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
