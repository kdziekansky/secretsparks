
import { useMemo } from 'react';
import { Question, SurveyConfig } from '@/types/survey';

const getRandomizedQuestions = (questions: Question[], config: SurveyConfig, maxQuestions: number = 20) => {
  // Sprawdzamy, czy konfiguracja jest kompletna (ma wszystkie pola ustawione)
  const isConfigComplete = config.userGender && config.partnerGender && config.gameLevel;
  
  // Jeśli konfiguracja nie jest kompletna, ale ankieta jest oznaczona jako skonfigurowana,
  // musimy użyć bardziej liberalnych zasad filtrowania
  console.log('Filtrowanie pytań dla konfiguracji:', config);
  console.log('Czy konfiguracja jest kompletna:', isConfigComplete);
  
  const filteredByConfig = questions.filter(question => {
    // Jeśli pytanie nie ma konfiguracji, jest uniwersalne
    if (!question.forConfig) {
      console.log(`Pytanie ${question.id} jest uniwersalne (brak forConfig)`);
      return true;
    }
    
    const { userGender, partnerGender, gameLevel } = question.forConfig;
    
    // Szczegółowe logowanie dla debugowania
    let isPassing = true;
    
    // Sprawdzamy płeć użytkownika tylko jeśli oba warunki są spełnione:
    // 1. Pytanie ma określone wymaganie co do płci
    // 2. Konfiguracja ma określoną płeć lub wymagamy kompletnej konfiguracji
    if (userGender && config.userGender && userGender !== config.userGender) {
      console.log(`Pytanie ${question.id} odrzucone: userGender ${userGender} ≠ ${config.userGender}`);
      isPassing = false;
    }
    
    // To samo dla płci partnera
    if (partnerGender && config.partnerGender && partnerGender !== config.partnerGender) {
      console.log(`Pytanie ${question.id} odrzucone: partnerGender ${partnerGender} ≠ ${config.partnerGender}`);
      isPassing = false;
    }
    
    // Dla poziomu gry zawsze sprawdzamy, ponieważ to pole jest wymagane
    if (gameLevel && config.gameLevel && !gameLevel.includes(config.gameLevel as any)) {
      console.log(`Pytanie ${question.id} odrzucone: poziom gry ${gameLevel} nie zawiera ${config.gameLevel}`);
      isPassing = false;
    }
    
    if (isPassing) {
      console.log(`Pytanie ${question.id} zaakceptowane dla konfiguracji ${config.userGender || 'any'}-${config.partnerGender || 'any'} (${config.gameLevel})`);
    }
    
    return isPassing;
  });

  console.log(`Po filtrowaniu zostało ${filteredByConfig.length} pytań z ${questions.length}`);

  // Jeśli nie mamy żadnych pytań po filtracji, spróbujmy bardziej liberalne podejście
  if (filteredByConfig.length === 0) {
    console.log('Brak pytań po filtracji. Stosowanie bardziej liberalnych kryteriów...');
    
    // Filtrujemy tylko według poziomu gry, ignorując płci
    return getQuestionsIgnoringGender(questions, config, maxQuestions);
  }

  // Reszta funkcji bez zmian - grupowanie pytań według pairGroup
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

// NOWA FUNKCJA: Pobiera pytania ignorując płeć, filtrując tylko według poziomu gry
const getQuestionsIgnoringGender = (questions: Question[], config: SurveyConfig, maxQuestions: number) => {
  console.log('Filtrowanie pytań tylko według poziomu gry:', config.gameLevel);
  
  const filteredByGameLevel = questions.filter(question => {
    // Jeśli pytanie nie ma konfiguracji forConfig, jest uniwersalne
    if (!question.forConfig) {
      console.log(`Pytanie ${question.id} jest uniwersalne (brak forConfig)`);
      return true;
    }
    
    // Jeśli pytanie nie ma wymagań co do poziomu gry, akceptujemy je
    if (!question.forConfig.gameLevel) {
      console.log(`Pytanie ${question.id} akceptowane (brak wymagań co do poziomu gry)`);
      return true;
    }
    
    // Sprawdzamy tylko poziom gry
    const isValidGameLevel = !config.gameLevel || 
                           !question.forConfig.gameLevel || 
                           question.forConfig.gameLevel.includes(config.gameLevel as any);
    
    if (!isValidGameLevel) {
      console.log(`Pytanie ${question.id} odrzucone: poziom gry ${question.forConfig.gameLevel} nie zawiera ${config.gameLevel}`);
    } else {
      console.log(`Pytanie ${question.id} zaakceptowane dla poziomu gry ${config.gameLevel}`);
    }
    
    return isValidGameLevel;
  });
  
  console.log(`Po liberalnym filtrowaniu zostało ${filteredByGameLevel.length} pytań z ${questions.length}`);
  
  // Wybierz losowo pytania (maksymalnie maxQuestions)
  if (filteredByGameLevel.length > 0) {
    const randomQuestions = filteredByGameLevel
      .sort(() => 0.5 - Math.random())
      .slice(0, maxQuestions);
    
    console.log(`Wybrano losowo ${randomQuestions.length} pytań ignorując kryteria płci`);
    return randomQuestions;
  }
  
  // Jeśli nadal nie mamy pytań, zwróćmy losowe pytania bez filtrowania
  console.log('Brak pytań po liberalnym filtrowaniu. Wybieramy kompletnie losowe pytania.');
  return questions
    .sort(() => 0.5 - Math.random())
    .slice(0, maxQuestions);
};

// ZMODYFIKOWANA FUNKCJA: Dodany parametr savedQuestionIds
export const useQuestionSelection = (
  questions: Question[],
  config: SurveyConfig,
  selectedQuestionIds: string[] = [],
  isPartnerSurvey: boolean = false
) => {
  return useMemo(() => {
    // Sprawdzamy czy mamy zapisane ID pytań
    if (selectedQuestionIds && selectedQuestionIds.length > 0) {
      console.log('Używam zapisanych ID pytań:', selectedQuestionIds.length);
      
      // Create a map of all questions by ID for quick lookup
      const questionMap = new Map(questions.map(q => [q.id, q]));
      
      // Get questions EXACTLY in the same order as in the selectedQuestionIds array
      const mappedQuestions = selectedQuestionIds
        .map(id => {
          const question = questionMap.get(id);
          if (!question) {
            console.warn(`Pytanie z ID ${id} nie znaleziono w bazie pytań`);
            return null;
          }
          return question;
        })
        .filter((q): q is Question => q !== null);
      
      console.log(`Pomyślnie zmapowano ${mappedQuestions.length} pytań z ${selectedQuestionIds.length} ID`);
      
      // WAŻNE: Zwracamy dokładnie te same pytania, w tej samej kolejności
      return mappedQuestions;
    }
    
    // Jeśli to ankieta partnera, ale nie mamy jeszcze ID pytań
    if (isPartnerSurvey && selectedQuestionIds.length === 0) {
      console.log('Ankieta partnera: Oczekiwanie na dane sekwencji pytań');
      return [];
    }
    
    // Don't generate questions if configuration is not complete
    // Usuwamy ten warunek, aby generować pytania nawet przy niekompletnej konfiguracji
    // if (!config.isConfigComplete) return [];
    
    // For regular user survey without saved question IDs, generate randomized questions
    console.log('Generuję nowy losowy zestaw pytań dla użytkownika');
    const randomizedQuestions = getRandomizedQuestions(questions, config, 20);
    console.log(`Wygenerowano ${randomizedQuestions.length} losowych pytań dla użytkownika`);
    return randomizedQuestions;
  }, [questions, config, selectedQuestionIds, isPartnerSurvey]);
};
