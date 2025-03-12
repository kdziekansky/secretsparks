
import { useMemo } from 'react';
import { Question, SurveyConfig } from '@/types/survey';

const getRandomizedQuestions = (questions: Question[], config: SurveyConfig, maxQuestions: number = 15) => {
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
  
  // Najpierw oblicz ile możemy wybrać par pytań
  const availableGroups = Object.keys(groupedQuestions);
  const maxPairs = Math.floor(maxQuestions / 2);
  const groupsToSelect = Math.min(maxPairs, availableGroups.length);
  
  // Teraz oblicz ile zostanie miejsca na pojedyncze pytania
  let remainingSlots = maxQuestions - (groupsToSelect * 2);
  
  // Losowo wybierz grupy
  const selectedGroups = availableGroups
    .sort(() => 0.5 - Math.random())
    .slice(0, groupsToSelect);
  
  // Losowo wybierz pojedyncze pytania
  const selectedSingles = singleQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, remainingSlots);

  // Dodaj wybrane pytania do wyniku
  selectedGroups.forEach(group => {
    // Dodajemy wszystkie pytania z grupy, zachowując ich sortowanie według pairPriority
    result.push(...groupedQuestions[group]);
  });
  
  result.push(...selectedSingles);
  
  console.log(`Wybrano ${result.length} pytań dla konfiguracji: `, config);
  
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
    const randomizedQuestions = getRandomizedQuestions(questions, config, 15);
    console.log(`Generated ${randomizedQuestions.length} randomized questions for user`);
    return randomizedQuestions;
  }, [questions, config, selectedQuestionIds, isPartnerSurvey]);
};
