import { useMemo } from 'react';
import { Question, SurveyConfig } from '@/types/survey';

const getRandomizedQuestions = (questions: Question[], config: SurveyConfig, maxQuestions: number = 20) => {
  // Filtruj pytania na podstawie konfiguracji
  console.log('Filtrowanie pytań dla konfiguracji:', config);
  
  const filteredByConfig = questions.filter(question => {
    // Jeśli pytanie nie ma konfiguracji, jest uniwersalne
    if (!question.forConfig) {
      console.log(`Pytanie ${question.id} jest uniwersalne (brak forConfig)`);
      return true;
    }
    
    const { userGender, partnerGender, gameLevel } = question.forConfig;
    
    // Szczegółowe logowanie dla debugowania
    let isPassing = true;
    
    // Sprawdź dokładne warunki płci
    if (userGender && userGender !== config.userGender) {
      console.log(`Pytanie ${question.id} odrzucone: userGender ${userGender} ≠ ${config.userGender}`);
      isPassing = false;
    }
    
    if (partnerGender && partnerGender !== config.partnerGender) {
      console.log(`Pytanie ${question.id} odrzucone: partnerGender ${partnerGender} ≠ ${config.partnerGender}`);
      isPassing = false;
    }
    
    // Sprawdź poziom gry
    if (gameLevel && !gameLevel.includes(config.gameLevel as any)) {
      console.log(`Pytanie ${question.id} odrzucone: poziom gry ${gameLevel} nie zawiera ${config.gameLevel}`);
      isPassing = false;
    }
    
    if (isPassing) {
      console.log(`Pytanie ${question.id} zaakceptowane dla konfiguracji ${config.userGender}-${config.partnerGender} (${config.gameLevel})`);
    }
    
    return isPassing;
  });

  console.log(`Po filtrowaniu zostało ${filteredByConfig.length} pytań z ${questions.length}`);

  // Grupuj pytania według pairGroup
  const groupedQuestions: Record<string, Question[]> = {};
  const singleQuestions: Question[] = [];

  filteredByConfig.forEach(question => {
    if (question.pairGroup) {
      if (!groupedQuestions[question.pairGroup]) {
        groupedQuestions[question.pairGroup] = [];
      }
      groupedQuestions[question.pairGroup].push(question);
    } else {
      singleQuestions.push(question);
    }
  });

  // Posortuj pytania w grupach według pairPriority (jeśli istnieje)
  Object.keys(groupedQuestions).forEach(group => {
    groupedQuestions[group].sort((a, b) => {
      const priorityA = a.pairPriority || 0;
      const priorityB = b.pairPriority || 0;
      return priorityA - priorityB;
    });
  });

  // Wybierz pytania
  const result: Question[] = [];
  
  // WAŻNA ZMIANA: Ograniczamy liczbę par pytań do maksymalnie 2
  const availableGroups = Object.keys(groupedQuestions);
  const MAX_PAIRS_ALLOWED = 2; // Maksymalnie 2 pary pytań
  const groupsToSelect = Math.min(MAX_PAIRS_ALLOWED, availableGroups.length);
  
  // Teraz oblicz ile zostanie miejsca na pojedyncze pytania
  let pairsCount = 0; // Licznik dodanych par
  let addedPairQuestions = 0; // Licznik pytań dodanych w parach
  
  // Losowo wybierz grupy
  const selectedGroups = availableGroups
    .sort(() => 0.5 - Math.random())
    .slice(0, groupsToSelect);
  
  // Dodaj wybrane pary do wyniku
  selectedGroups.forEach(group => {
    const pairQuestions = groupedQuestions[group];
    if (pairQuestions.length > 0) {
      result.push(...pairQuestions);
      pairsCount++;
      addedPairQuestions += pairQuestions.length;
      console.log(`Dodano parę pytań '${group}' (${pairQuestions.length} pytań)`);
    }
  });
  
  console.log(`Dodano ${pairsCount} par, łącznie ${addedPairQuestions} pytań`);
  
  // Oblicz ile pojedynczych pytań można jeszcze dodać
  const remainingSlots = maxQuestions - addedPairQuestions;
  console.log(`Pozostało miejsce na ${remainingSlots} pojedynczych pytań`);
  
  // Losowo wybierz pojedyncze pytania
  if (remainingSlots > 0 && singleQuestions.length > 0) {
    const selectedSingles = singleQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, remainingSlots);
    
    result.push(...selectedSingles);
    console.log(`Dodano ${selectedSingles.length} pojedynczych pytań`);
  }
  
  console.log(`Wybrano łącznie ${result.length} pytań dla konfiguracji: `, config);
  
  // Jeśli mamy za mało pytań, możemy losowo wybrać więcej z pozostałych pojedynczych
  if (result.length < maxQuestions && singleQuestions.length > 0) {
    const additionalNeeded = maxQuestions - result.length;
    console.log(`Za mało pytań. Dodajemy jeszcze ${additionalNeeded} dodatkowych pytań`);
    
    // Usuń pytania, które już zostały wybrane
    const remainingSingles = singleQuestions.filter(
      q => !result.some(selected => selected.id === q.id)
    );
    
    if (remainingSingles.length > 0) {
      const additionalSingles = remainingSingles
        .sort(() => 0.5 - Math.random())
        .slice(0, additionalNeeded);
      
      result.push(...additionalSingles);
      console.log(`Dodano ${additionalSingles.length} dodatkowych pojedynczych pytań`);
    }
  }
  
  // Upewnij się, że nie przekraczamy maksymalnej liczby pytań
  return result.slice(0, maxQuestions);
};

export const useQuestionSelection = (
  questions: Question[],
  config: SurveyConfig,
  selectedQuestionIds: string[] = [],
  isPartnerSurvey: boolean = false
) => {
  return useMemo(() => {
    // WAŻNE: Dla ankiety partnera z istniejącymi ID pytań, używamy DOKŁADNIE tej samej sekwencji
    if (isPartnerSurvey) {
      // Nawet jeśli nie mamy jeszcze ID pytań, zwracamy pustą tablicę zamiast losować
      if (selectedQuestionIds.length === 0) {
        console.log('Partner survey: Waiting for question sequence data');
        return [];
      }
      
      console.log('Partner survey: Using pre-defined question sequence:', selectedQuestionIds);
      
      // Create a map of all questions by ID for quick lookup
      const questionMap = new Map(questions.map(q => [q.id, q]));
      
      // Get questions EXACTLY in the same order as in the selectedQuestionIds array
      const mappedQuestions = selectedQuestionIds
        .map(id => {
          const question = questionMap.get(id);
          if (!question) {
            console.warn(`Question with ID ${id} not found in questions database`);
            return null;
          }
          return question;
        })
        .filter((q): q is Question => q !== null);
      
      console.log(`Successfully mapped ${mappedQuestions.length} partner questions out of ${selectedQuestionIds.length} IDs`);
      
      if (mappedQuestions.length !== selectedQuestionIds.length) {
        console.error('Some questions could not be mapped. This could cause inconsistencies between user and partner surveys.');
      }
      
      // IMPORTANT: Return the mapped questions without any further filtering or processing
      return mappedQuestions;
    }
    
    // Don't generate questions if configuration is not complete
    if (!config.isConfigComplete) return [];
    
    // For regular user survey, generate randomized questions
    const randomizedQuestions = getRandomizedQuestions(questions, config, 20);
    console.log(`Generated ${randomizedQuestions.length} randomized questions for user`);
    return randomizedQuestions;
  }, [questions, config, selectedQuestionIds, isPartnerSurvey]);
};
