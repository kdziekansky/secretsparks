import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export type Gender = 'male' | 'female' | null;
export type GameLevel = 'discover' | 'explore' | 'exceed' | null;

export interface SurveyConfig {
  userGender: Gender;
  partnerGender: Gender;
  gameLevel: GameLevel;
  isConfigComplete: boolean;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  forConfig?: {
    userGender?: Gender;
    partnerGender?: Gender;
    gameLevel?: GameLevel;
  };
}

interface SurveyContextType {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  questions: Question[];
  surveyConfig: SurveyConfig;
  totalQuestions: number;
  setAnswer: (questionId: string, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  currentQuestion: Question | null;
  progress: number;
  resetSurvey: () => void;
  setUserGender: (gender: Gender) => void;
  setPartnerGender: (gender: Gender) => void;
  setGameLevel: (level: GameLevel) => void;
  completeConfig: () => void;
  isInConfigurationMode: boolean;
  filteredQuestions: Question[];
}

const defaultQuestions: Question[] = [
  { 
    id: 'q1', 
    text: 'Pozycja „syreny"',
    description: 'Czy marzyłaś kiedyś o zmysłowej pozycji, która łączy subtelność z głęboką penetracją? Leżąc na boku z nogami lekko zgiętymi, pozwalasz partnerowi na wygodny dostęp, podczas gdy on przylega do Twoich pleców, tworząc bliski, ciepły kontakt ciał.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q2', 
    text: 'Zmysłowy taniec erotyczny',
    description: 'Czy kiedykolwiek rozważałaś użycie tańca jako narzędzia do uwodzenia i pogłębienia więzi emocjonalnej z partnerem? Zmysłowy taniec erotyczny to świetna okazja, aby wyrazić swoją seksualność, poruszając się w rytm ulubionej muzyki, uwodząc partnera każdym ruchem ciała. Możesz włączyć odpowiednią muzykę, założyć coś, w czym poczujesz się seksownie, a następnie pozwolić sobie na spontaniczny taniec, nawiązując z partnerem intensywny kontakt wzrokowy. Taniec pomaga przełamać bariery, buduje pewność siebie i pobudza pożądanie, prowadząc do głębszego połączenia.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q3', 
    text: 'Pieszczoty lodem i ciepłem',
    description: 'Czy marzyłaś o eksplorowaniu nowych doznań poprzez zabawy z temperaturą? Pieszczoty lodem i ciepłem to technika, która polega na naprzemiennym przykładaniu do skóry zimnych (np. kostka lodu) i ciepłych przedmiotów (np. ciepły olejek do masażu). Takie kontrasty pobudzają ukrwienie skóry, zwiększają wrażliwość na dotyk oraz intensyfikują doznania erotyczne. Eksperymentując z temperaturą, możecie odkrywać swoje ciała na nowo, przełamując rutynę i zwiększając swoją wrażliwość.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q4', 
    text: 'Wspólne oglądanie filmów porno',
    description: 'Czy myślałaś kiedyś o wspólnym oglądaniu filmów erotycznych jako sposobie na dodanie nowości i ekscytacji do Waszej relacji? To doświadczenie może stać się inspirującym początkiem rozmów o Waszych fantazjach i pragnieniach. Warto wcześniej porozmawiać z partnerem, aby upewnić się, że wybierzecie film odpowiadający Waszym preferencjom – subtelny erotyk, romantyczny film czy bardziej odważną produkcję. Możecie potraktować to jako okazję do odkrycia nowych aspektów własnej seksualności i sprawdzenia, co Was wzajemnie podnieca. Oglądając razem, obserwujcie swoje reakcje, dotykajcie się delikatnie i pozwólcie, by napięcie budowało się naturalnie. Wspólne oglądanie filmów erotycznych może nie tylko pobudzić Waszą wyobraźnię, ale także pomóc w eksplorowaniu nowych form bliskości.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q5', 
    text: 'Wzajemna lekka dominacja',
    description: 'Czy myślałaś kiedyś o zabawie dynamiką dominacji i uległości w sposób subtelny i wzajemny? Wzajemna lekka dominacja pozwala Wam na płynną wymianę ról podczas stosunku, gdzie raz Ty przejmujesz kontrolę, a raz Twój partner. Dzięki temu możecie odkrywać nowe formy przyjemności, ucząc się swoich preferencji i granic. Ta gra wzmocni Wasze wzajemne zaufanie, ucząc jednocześnie świadomej komunikacji w sferze seksualnej.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q6', 
    text: 'Seks oralny dla niej',
    description: 'Czy dajesz sobie pełną swobodę w odkrywaniu przyjemności, gdy partner koncentruje się wyłącznie na Twojej satysfakcji? Seks oralny to technika, która pozwala na niezwykle intensywne pobudzenie łechtaczki oraz innych wrażliwych obszarów narządów płciowych. Partner może eksperymentować z tempem, siłą nacisku języka czy ust, by odkryć, co daje Ci największą rozkosz. Ta forma bliskości wzmacnia Waszą więź emocjonalną, dając Ci szansę całkowitego odprężenia się i czerpania przyjemności w bezpiecznej i komfortowej atmosferze.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q7', 
    text: 'Seks oralny dla niego',
    description: 'Czy zastanawiałaś się, jak sprawić partnerowi przyjemność w sposób, który nie tylko pobudzi jego zmysły, ale także wzmocni Waszą więź? Seks oralny to forma intymności, która pozwala na eksplorowanie ciała partnera, reagowanie na jego odczucia i pogłębianie wzajemnej bliskości. Kluczem do udanych pieszczot jest nie tylko technika, ale przede wszystkim uważność na jego reakcje. arto również zwrócić uwagę na kontakt wzrokowy – może on dodatkowo podniecić partnera i sprawić, że chwila stanie się jeszcze bardziej intymna. Jeśli chcesz dodać do zabawy nowe bodźce, możesz wykorzystać temperaturę – na przykład popijając łyk ciepłej herbaty lub biorąc do ust kostkę lodu przed kontynuowaniem pieszczot.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q8', 
    text: 'Jej edging',
    description: 'Czy chciałabyś doświadczyć intensywniejszego, dłuższego orgazmu poprzez kontrolowanie momentu szczytowania? Edging polega na doprowadzaniu Cię do granicy rozkoszy, a następnie chwilowym przerwaniu stymulacji, by napięcie seksualne narastało. Twój partner może stosować różne techniki – od delikatnych pieszczot łechtaczki, przez seks oralny, po penetrację – zatrzymując się tuż przed szczytem, by po chwili zacząć od nowa. Ta metoda pozwala na stopniowe budowanie napięcia, zwiększając intensywność ostatecznej rozkoszy i sprawiając, że finał staje się jeszcze bardziej eksplozją przyjemności.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q9', 
    text: 'Jego edging',
    description: 'Czy zastanawiałaś się, jak wydłużyć przyjemność partnera i sprawić, by jego orgazm był jeszcze intensywniejszy? Edging to technika polegająca na doprowadzaniu go do granicy szczytowania, a następnie zatrzymaniu stymulacji tuż przed kulminacją, pozwalając napięciu seksualnemu narastać. Możesz wykorzystać dłonie, usta lub inne formy pieszczot, obserwując jego reakcje i budując napięcie stopniowo. Powtarzanie tego cyklu kilka razy sprawia, że finał staje się znacznie mocniejszy i bardziej satysfakcjonujący, a jednocześnie pozwala Wam na dłuższą, bardziej intensywną grę wstępną.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q10', 
    text: 'Masaż tantryczny dla niego',
    description: 'Czy chciałabyś podarować swojemu partnerowi chwilę niezwykłej zmysłowości, relaksu i głębokiej bliskości? Masaż tantryczny dla mężczyzny to praktyka, w której poświęcasz pełną uwagę jego ciału, zaczynając od delikatnych pieszczot stóp, nóg oraz pleców i stopniowo kierując się w stronę bardziej wrażliwych miejsc. Techniki tantryczne obejmują świadome oddychanie oraz uważne dotykanie, co pozwala partnerowi głębiej odczuwać przyjemność oraz buduje między Wami intensywną, emocjonalną więź.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q11', 
    text: 'Masaż tantryczny dla niej',
    description: 'Czy myślałaś o tym, jakby to było, gdyby Twój partner całkowicie skupił się na celebrowaniu Twojego ciała i zmysłów? Masaż tantryczny to nie tylko forma relaksu, ale także sposób na pogłębienie intymnej więzi. Twój partner zaczyna od delikatnych, powolnych ruchów – najpierw na dłoniach i stopach, stopniowo przesuwając się w górę, by rozgrzać całe ciało. Każdy dotyk ma na celu pobudzenie energii i zwiększenie wrażliwości na przyjemność. Masaż obejmuje plecy, biodra, pośladki, piersi, aż po najbardziej wrażliwe strefy, pozwalając Ci całkowicie zanurzyć się w doznaniach. Nie chodzi o szybkie spełnienie, lecz o podróż przez ciało, która pozwala odkrywać przyjemność w nowy, głęboko zmysłowy sposób.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q12', 
    text: 'Szeptanie do ucha i dirty talk',
    description: 'Czy zastanawiałaś się kiedyś, jak mocno słowa mogą pobudzić wyobraźnię i emocje podczas intymnych chwil? Szeptanie do ucha lub używanie odważniejszego języka („dirty talk") pozwala na intensyfikację przeżywanych doznań, wzmacniając podniecenie i pomagając wyrazić najskrytsze fantazje. Możecie zacząć od delikatnych komplementów i stopniowo przechodzić do bardziej pikantnych wyznań czy sugestii, obserwując wzajemne reakcje i budując napięcie erotyczne.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q13', 
    text: 'Zabawki dla niego',
    description: 'Czy zastanawiałaś się, jak możesz urozmaicić Wasze życie intymne, wprowadzając gadżety erotyczne dla partnera? Wibracyjne pierścienie erekcyjne, masturbatory, stymulatory prostaty czy pulsujące masażery to tylko niektóre z opcji, które mogą dostarczyć mu nowych doznań. Możecie używać ich wspólnie podczas gry wstępnej lub pozwolić mu na eksplorację w samotności, by lepiej poznał swoje ciało. Otwarta rozmowa o preferencjach i gotowość do eksperymentowania sprawią, że gadżety staną się nie tylko narzędziem przyjemności, ale także sposobem na wzmacnianie Waszej więzi i odkrywanie nowych obszarów rozkoszy.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q14', 
    text: 'Zabawki dla niej',
    description: 'Czy chciałabyś odkryć nowe poziomy przyjemności i lepiej poznać swoje ciało? Wibratory, masażery łechtaczki, kulki gejszy czy stymulatory punktu G to tylko niektóre z gadżetów, które mogą pomóc Ci eksplorować różne rodzaje doznań – zarówno w pojedynkę, jak i z partnerem. Wspólne włączanie zabawek do gry wstępnej może dodać nowego wymiaru bliskości i pomóc w odkryciu tego, co sprawia Ci największą rozkosz. Kluczem jest otwartość, eksperymentowanie i znalezienie gadżetu, który najlepiej odpowiada Twoim potrzebom, pozwalając czerpać przyjemność w nowy, bardziej świadomy sposób.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  },
  { 
    id: 'q15', 
    text: 'Slow sex',
    description: 'Czy zastanawiałaś się nad tym, jak by było delektować się każdym momentem bliskości, świadomie zwalniając tempo stosunku? Slow sex pozwala na skupienie się na każdym ruchu, każdym dotyku i każdym pocałunku, zwiększając poczucie bliskości emocjonalnej i fizycznej. Kluczową zasadą slow seksu jest świadome oddychanie i zwolnienie tempa, co pozwala na intensyfikację doznań oraz głębsze przeżywanie wzajemnej obecności. Dzięki tej praktyce możecie nauczyć się czerpać przyjemność z całej drogi, nie tylko z finału, budując jednocześnie głębszą, bardziej świadomą więź.',
    forConfig: { 
      userGender: 'female', 
      partnerGender: 'male', 
      gameLevel: 'discover' 
    }
  }
];

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [questions] = useState<Question[]>(defaultQuestions);
  const [surveyConfig, setSurveyConfig] = useState<SurveyConfig>({
    userGender: null,
    partnerGender: null,
    gameLevel: null,
    isConfigComplete: false
  });

  const isInConfigurationMode = !surveyConfig.isConfigComplete;

  const filteredQuestions = useMemo(() => {
    if (!surveyConfig.isConfigComplete) return [];
    
    return questions.filter(question => {
      if (!question.forConfig) return true;
      
      const { userGender, partnerGender, gameLevel } = question.forConfig;
      
      if (userGender && userGender !== surveyConfig.userGender) return false;
      if (partnerGender && partnerGender !== surveyConfig.partnerGender) return false;
      if (gameLevel && gameLevel !== surveyConfig.gameLevel) return false;
      
      return true;
    });
  }, [questions, surveyConfig]);

  const totalQuestions = filteredQuestions.length;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentQuestion = filteredQuestions[currentQuestionIndex] || null;
  
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return ((currentQuestionIndex) / (totalQuestions - 1)) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  const setAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const nextQuestion = useCallback(() => {
    // Blokujemy przejście, jeśli nie ma odpowiedzi na aktualne pytanie
    const currentQ = filteredQuestions[currentQuestionIndex];
    if (!currentQ || answers[currentQ.id] === undefined) {
      console.log("Blocked navigation - no answer for current question");
      return;
    }
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, filteredQuestions, answers]);

  const prevQuestion = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [isFirstQuestion]);
  
  const resetSurvey = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSurveyConfig({
      userGender: null,
      partnerGender: null,
      gameLevel: null,
      isConfigComplete: false
    });
  }, []);

  const setUserGender = useCallback((gender: Gender) => {
    setSurveyConfig(prev => ({ ...prev, userGender: gender }));
  }, []);

  const setPartnerGender = useCallback((gender: Gender) => {
    setSurveyConfig(prev => ({ ...prev, partnerGender: gender }));
  }, []);

  const setGameLevel = useCallback((level: GameLevel) => {
    setSurveyConfig(prev => ({ ...prev, gameLevel: level }));
  }, []);

  const completeConfig = useCallback(() => {
    setSurveyConfig(prev => ({ ...prev, isConfigComplete: true }));
    setCurrentQuestionIndex(0);
  }, []);

  const value = {
    currentQuestionIndex,
    answers,
    questions,
    surveyConfig,
    totalQuestions,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
    currentQuestion,
    progress,
    resetSurvey,
    setUserGender,
    setPartnerGender,
    setGameLevel,
    completeConfig,
    isInConfigurationMode,
    filteredQuestions,
  };

  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
};

export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
