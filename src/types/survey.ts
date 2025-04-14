export type Gender = 'male' | 'female' | null;
export type GameLevel = 'discover' | 'fun' | 'challenge' | null;

export interface Question {
  id: string;
  text: string;
  description?: string;
  illustration?: string;
  forConfig?: {
    userGender?: Gender;
    partnerGender?: Gender;
    gameLevel?: GameLevel[];
  };
  pairGroup?: string;
  pairPriority?: number;
}

export interface SurveyConfig {
  userGender: Gender;
  partnerGender: Gender;
  gameLevel: GameLevel;
  isConfigComplete: boolean;
}

// Rozszerzony interfejs kontekstu ankiety
export interface SurveyContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: Record<string, number>;
  setAnswer: (questionId: string, value: number) => void;
  questions: Question[];
  surveyConfig: SurveyConfig;
  totalQuestions: number;
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
  setIsInConfigurationMode: (value: boolean) => void; // NOWE: Dodana metoda do zmiany trybu konfiguracji
  showInstructions: boolean;
  completeInstructions: () => void;
  isPartnerSurvey: boolean;
  filteredQuestions: Question[];
  saveAnswer: (isPartnerSurvey?: boolean) => Promise<void>;
  setOrderId: (id: string) => void;
  getOrderId: () => string | null;
}
