
import { questionsHeteroMale } from './questions/questions-hetero-male';
import { questionsHeteroFemale } from './questions/questions-hetero-female';
import { questionsAdditional } from './questions/questions-additional';
import type { Question } from '@/types/survey';

// Funkcja do normalizacji ścieżek obrazów
const normalizeImagePaths = (questions: Question[]): Question[] => {
  return questions.map(question => {
    if (!question.illustration) return question;
    
    // Tworzymy kopię pytania i aktualizujemy ścieżkę ilustracji
    const updatedQuestion = { ...question };
    
    // Pobierz nazwę pliku z oryginalnej ścieżki - wyciągamy ostatnią część po ostatnim /
    let fileName = question.illustration.split('/').pop() || '';
    
    // Lista dostępnych plików
    const availableFiles = [
      "69.png", "bridge.png", "Bukkake (exceed).png", "Cyberseks z obcymi (explore, exceed).png",
      "Cyberseks ze znajomymi (explore, exceed).png", "dirtytalk.png", "doctor.png", 
      "dominateher.png", "Elektrostymulacja – (explore, exceed).png", "Fingering (discover, explore).png",
      "firsttime.png", "Fisting (explore, exceed).png", "Footjob (discover, explore).png", 
      "Głębokie gardło (exceed).png", "incar.png", "Jego edging (discover, explore).png", 
      "Jej edging (discover, explore).png", "Jej randka z nieznajomym (explore, exceed).png", 
      "Klatka na penisa (exceed).png", "lekkiepodduszanie.png", "lotus.png", 
      "Masaż tantryczny dla niego (discover, explore).png", "Masaż tantryczny dla niej (discover, explore).png", 
      "Masaż tantryczny dla pary (explore, exceed).png", "Nauczycielka i student.png", 
      "observation.png", "Ona dominuje nad nim (discover, explore).png", "Orgia (exceed).png", 
      "Pegging him (exceed).png", "Pełna dominacja i uległość (exceed).png", 
      "Pieszczoty lodem i ciepłem (discover, explore).png", "Pissing – jego złoty deszcz (exceed).png", 
      "Poker rozbierany z obcymi (explore, exceed).png", "Poker rozbierany ze znajomymi (explore, exceed).png", 
      "poomacku.png", "Pozycja Amazonki (discover, explore).png", "Pozycja misjonarska (discover).png", 
      "Pozycja _leniwego pieska_ (discover).png", "Pozycja _na pieska_ (discover, explore, exceed).png", 
      "Pozycja _łyżeczki_ (discover).png", "queen.png", "Randka z Tindera (discover, explore).png", 
      "reversedamazonka.png", "riding.png", "Rozmowy o przeszłości seksualnej (exceed).png", 
      "Seks na stole kuchennym (discover, explore).png", "Seks oralny dla niego (discover).png", 
      "Seks oralny dla niej (discover).png", "Seks w masce (exceed).png", 
      "Seks w miejscu publicznym (explore, exceed).png", "Seks w przebieralni (explore, exceed).png", 
      "Seks w tańcu (exceed).png", "Seks w trakcie kąpieli (explore).png", 
      "Seks w windzie (explore, exceed).png", "Seksowna bielizna (discover).png", 
      "Sexting (discover, explore).png", "softdomination.png", 
      "Sterowanie wibratorem w miejscu publicznym (explore, exceed).png", 
      "Striptiz dla niego (discover).png", "Striptiz dla niej (discover).png", 
      "Titfuck (discover, explore).png", "Trójkąt z kobietą (exceed).png", 
      "Trójkąt z mężczyzną (exceed).png", "Użycie olejków do masażu erotycznego (discover).png", 
      "Wieczór z wybraną parą (exceed).png", "Wspólne oglądanie filmów porno (discover).png", 
      "Wzajemna masturbacja (discover).png", "Własny film erotyczny (explore, exceed).png", 
      "Zabawki dla niego (discover).png", "Zabawki dla niej (discover).png", 
      "Zabawy z bitą śmietaną (explore, exceed).png", "Zdrada kontrolowana – on zdradza (exceed).png", 
      "zdrada.png", "Złota rączka_ i samotna żona.png", "handyman.svg", "krolowa.svg"
    ];
    
    // Bazowa ścieżka dla wszystkich obrazów
    const basePath = "/images/illustrations/techniques/";
    
    // Najpierw próbujemy znaleźć dokładne dopasowanie
    let matchedFile = availableFiles.find(file => file === fileName);
    
    // Jeśli nie znaleziono dokładnego dopasowania, spróbujmy znaleźć najbliższy plik
    if (!matchedFile) {
      // Spróbujmy znaleźć plik, ignorując wielkość liter, spacje, etc.
      const normalizedFileName = fileName.toLowerCase().replace(/[\s\(\),']/g, '');
      matchedFile = availableFiles.find(file => {
        const normalizedFile = file.toLowerCase().replace(/[\s\(\),']/g, '');
        return normalizedFile.includes(normalizedFileName) || normalizedFileName.includes(normalizedFile);
      });
      
      // Jeśli nie znaleźliśmy pasującego pliku, sprawdźmy konkretne mapowania dla problematycznych plików
      if (!matchedFile) {
        const specialCases: Record<string, string> = {
          'Seks oralny dla niej (discover).png': 'Seks oralny dla niej (discover).png',
          'Seks oralny dla niego (discover).png': 'Seks oralny dla niego (discover).png',
          'Masaż tantryczny dla niego (discover, explore).png': 'Masaż tantryczny dla niego (discover, explore).png',
          'Masaż tantryczny dla niej (discover, explore).png': 'Masaż tantryczny dla niej (discover, explore).png',
          'Nauczycielka i student.png': 'Nauczycielka i student.png',
          'Pozycja Amazonki (discover, explore).png': 'Pozycja Amazonki (discover, explore).png',
          'Złota rączka_ i samotna żona.png': 'Złota rączka_ i samotna żona.png'
        };
        
        matchedFile = specialCases[fileName];
      }
    }
    
    // Jeśli znaleźliśmy pasujący plik, użyjmy go; w przeciwnym razie użyjmy oryginalnej nazwy
    updatedQuestion.illustration = basePath + (matchedFile || fileName);
    
    return updatedQuestion;
  });
};

// Najpierw normalizujemy ścieżki we wszystkich pytaniach
const normalizedMaleQuestions = normalizeImagePaths(questionsHeteroMale);
const normalizedFemaleQuestions = normalizeImagePaths(questionsHeteroFemale);
const normalizedAdditionalQuestions = normalizeImagePaths(questionsAdditional);

// Łączymy wszystkie pytania w jedną tablicę
export const questions: Question[] = [
  ...normalizedMaleQuestions,
  ...normalizedFemaleQuestions,
  ...normalizedAdditionalQuestions
];

// Eksportujemy też jako questionsDatabase dla pełnej kompatybilności wstecznej
export const questionsDatabase = questions;
