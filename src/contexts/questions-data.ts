
import { questionsHeteroMale } from './questions/questions-hetero-male';
import { questionsHeteroFemale } from './questions/questions-hetero-female';
import { questionsAdditional } from './questions/questions-additional';
import type { Question } from '@/types/survey';

// Łączymy wszystkie pytania w jedną tablicę
export const questions: Question[] = [
  ...questionsHeteroMale,
  ...questionsHeteroFemale,
  ...questionsAdditional
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
