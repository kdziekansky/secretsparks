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
    
    // Jeśli ścieżka zaczyna się od /lovable-uploads/, nie koduj jej
    if (question.illustration.startsWith('/lovable-uploads/')) return question;
    
    // Dla pozostałych przypadków, zakoduj całą ścieżkę
    return {
      ...question,
      illustration: encodeURI(question.illustration)
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
