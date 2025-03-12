
import { questionsHeteroMale } from './questions/questions-hetero-male';
import { questionsHeteroFemale } from './questions/questions-hetero-female';
import { questionsAdditional } from './questions/questions-additional';
import type { Question } from '@/types/survey';

// Helper do enkodowania ścieżek URL obrazów
const encodeImagePaths = (questions: Question[]): Question[] => {
  return questions.map(question => {
    if (!question.illustration) return question;
    
    // Nie modyfikuj URL-i, które już mają protokół (np. http, https)
    if (question.illustration.startsWith('http')) return question;
    
    // Rozdziel ścieżkę na części
    const lastSlashIndex = question.illustration.lastIndexOf('/');
    if (lastSlashIndex === -1) return question;
    
    const path = question.illustration.substring(0, lastSlashIndex + 1);
    const filename = question.illustration.substring(lastSlashIndex + 1);
    
    // Utwórz nowy obiekt pytania z zakodowaną ścieżką do ilustracji
    return {
      ...question,
      illustration: path + encodeURIComponent(filename)
    };
  });
};

// Zakoduj ścieżki obrazów przed połączeniem pytań
const encodedHeteroMale = encodeImagePaths(questionsHeteroMale);
const encodedHeteroFemale = encodeImagePaths(questionsHeteroFemale);
const encodedAdditional = encodeImagePaths(questionsAdditional);

// Łączymy wszystkie pytania w jedną tablicę
export const questions: Question[] = [
  ...encodedHeteroMale,
  ...encodedHeteroFemale,
  ...encodedAdditional
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
