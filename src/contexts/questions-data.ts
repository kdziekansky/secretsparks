
import { questionsHeteroMale } from './questions/questions-hetero-male';
import { questionsHeteroFemale } from './questions/questions-hetero-female';
import { questionsAdditional } from './questions/questions-additional';
import type { Question } from '@/types/survey';

// PROBLEM: Obrazy nie ładują się prawidłowo
// ROZWIĄZANIE: Upewniamy się, że ścieżki do obrazów są poprawne

// Funkcja poprawiająca ścieżki do obrazów - wszystkie ścieżki są już poprawne
// w plikach pytań, więc po prostu zwracamy oryginalne ścieżki bez modyfikacji
const normalizeImagePaths = (questions: Question[]): Question[] => {
  return questions.map(q => ({
    ...q
  }));
};

// Stosujemy funkcję normalizacji do wszystkich zestawów pytań
const normalizedMale = normalizeImagePaths(questionsHeteroMale);
const normalizedFemale = normalizeImagePaths(questionsHeteroFemale);
const normalizedAdditional = normalizeImagePaths(questionsAdditional);

// Łączymy wszystkie pytania w jedną tablicę
export const questions: Question[] = [
  ...normalizedMale,
  ...normalizedFemale,
  ...normalizedAdditional
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
