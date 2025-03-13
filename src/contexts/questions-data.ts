
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
      
      // Dla ścieżek z lovable-uploads, zachowaj ścieżkę ale zakoduj nazwę pliku
      if (cleanUrl.startsWith('/lovable-uploads/')) {
        const basePath = '/lovable-uploads/';
        const fileName = cleanUrl.substring(basePath.length);
        
        // Przekieruj na prawidłową ścieżkę z nazwą pliku
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(fileName)}`
        };
      }
      
      // Standardowa obsługa dla ścieżek z /images/illustrations/
      if (cleanUrl.includes('/images/illustrations/') || cleanUrl.startsWith('/images/')) {
        const fileName = cleanUrl.split('/').pop() || '';
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(fileName)}`
        };
      }
      
      // Dla ścieżek bez określonego katalogu, załóż że to obrazy w techniques
      if (!cleanUrl.startsWith('/')) {
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(cleanUrl)}`
        };
      }
      
      // Dla innych ścieżek, zakoduj tylko część po ostatnim slashu (nazwa pliku)
      const lastSlashIndex = cleanUrl.lastIndexOf('/');
      if (lastSlashIndex === -1) {
        // Jeśli nie ma slasha, to zapewne sama nazwa pliku - dodaj do ścieżki technik
        return {
          ...question,
          illustration: `/images/illustrations/techniques/${encodeURIComponent(cleanUrl)}`
        };
      }
      
      const path = cleanUrl.substring(0, lastSlashIndex + 1);
      const fileName = cleanUrl.substring(lastSlashIndex + 1);
      
      // Utwórz nowy obiekt pytania z zakodowaną ścieżką do ilustracji
      return {
        ...question,
        illustration: path + encodeURIComponent(fileName)
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
