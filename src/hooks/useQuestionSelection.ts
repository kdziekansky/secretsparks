
import { useMemo } from 'react';
import { Question, SurveyConfig } from '@/types/survey';

const getRandomizedQuestions = (questions: Question[], config: SurveyConfig, maxQuestions: number = 15) => {
  // Filter questions based on configuration
  const filteredByConfig = questions.filter(question => {
    if (!question.forConfig) return true;
    
    const { userGender, partnerGender, gameLevel } = question.forConfig;
    
    if (userGender && userGender !== config.userGender) return false;
    if (partnerGender && partnerGender !== config.partnerGender) return false;
    if (gameLevel && !gameLevel.includes(config.gameLevel as any)) return false;
    
    return true;
  });

  // Group questions by pairGroup
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

  // Select questions
  const result: Question[] = [];
  const availableGroups = Object.keys(groupedQuestions);
  const groupsToSelect = Math.min(Math.floor(maxQuestions / 2), availableGroups.length);
  let remainingSlots = maxQuestions - (groupsToSelect * 2);
  
  // Randomly select groups and singles
  const selectedGroups = availableGroups
    .sort(() => 0.5 - Math.random())
    .slice(0, groupsToSelect);
  
  const selectedSingles = singleQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, remainingSlots);

  // Add selected questions to result
  selectedGroups.forEach(group => {
    const sortedGroupQuestions = groupedQuestions[group]
      .sort((a, b) => (a.pairPriority || 0) - (b.pairPriority || 0));
    result.push(...sortedGroupQuestions);
  });
  
  result.push(...selectedSingles);
  
  return result.slice(0, maxQuestions);
};

export const useQuestionSelection = (
  questions: Question[],
  config: SurveyConfig,
  selectedQuestionIds: string[] = [],
  isPartnerSurvey: boolean = false
) => {
  return useMemo(() => {
    // Dla ankiety partnera z istniejącymi ID pytań, upewnij się, że używamy DOKŁADNIE tej samej sekwencji
    if (isPartnerSurvey && selectedQuestionIds.length > 0) {
      console.log('Partner survey: Using pre-defined question sequence:', selectedQuestionIds);
      
      // Utwórz mapę wszystkich pytań według ID dla szybkiego wyszukiwania
      const questionMap = new Map(questions.map(q => [q.id, q]));
      
      // Pobierz pytania DOKŁADNIE w takiej samej kolejności jak w tablicy selectedQuestionIds
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
      
      // WAŻNE: Zwróć zmapowane pytania bez żadnego dalszego filtrowania czy przetwarzania
      return mappedQuestions;
    }
    
    // Nie generuj pytań, jeśli konfiguracja nie jest kompletna
    if (!config.isConfigComplete) return [];
    
    // Dla zwykłej ankiety użytkownika generuj losowe pytania
    const randomizedQuestions = getRandomizedQuestions(questions, config, 15);
    console.log(`Generated ${randomizedQuestions.length} randomized questions for user`);
    return randomizedQuestions;
  }, [questions, config, selectedQuestionIds, isPartnerSurvey]);
};
