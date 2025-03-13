
import { questionsHeteroMale } from './questions/questions-hetero-male';
import { questionsHeteroFemale } from './questions/questions-hetero-female';
import { questionsAdditional } from './questions/questions-additional';
import type { Question } from '@/types/survey';

// Logujemy pierwotne ścieżki do debugowania
console.log("Original image paths examples:", 
  questionsHeteroMale.slice(0, 2).map(q => q.illustration),
  questionsHeteroFemale.slice(0, 2).map(q => q.illustration),
  questionsAdditional.slice(0, 2).map(q => q.illustration)
);

// Łączymy wszystkie pytania w jedną tablicę, bez jakiegokolwiek przetwarzania ścieżek
export const questions: Question[] = [
  ...questionsHeteroMale,
  ...questionsHeteroFemale,
  ...questionsAdditional
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
