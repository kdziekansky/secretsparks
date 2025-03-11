
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
    if (!config.isConfigComplete) return [];
    
    // For partner survey with existing questions
    if (isPartnerSurvey && selectedQuestionIds.length > 0) {
      console.log('Using predefined question sequence for partner:', selectedQuestionIds);
      
      // IMPROVED: Get questions in the exact same order as the user answered them
      const orderedQuestions = selectedQuestionIds
        .map(id => questions.find(q => q.id === id))
        .filter((q): q is Question => q !== undefined);
        
      console.log(`Found ${orderedQuestions.length} matching questions from ${selectedQuestionIds.length} ids`);
      return orderedQuestions;
    }
    
    // For regular user survey, generate random questions
    return getRandomizedQuestions(questions, config, 15);
  }, [questions, config, selectedQuestionIds, isPartnerSurvey]);
};
