
export interface Question {
  id: string;
  title: string;
  description?: string;
  image?: string;
  adultContent?: boolean;
  // Dodatkowe pola używane w istniejących pytaniach
  text?: string; // Kompatybilność wsteczna z istniejącymi pytaniami
  forConfig?: {
    userGender?: Gender;
    partnerGender?: Gender;
    gameLevel?: GameLevel[];
  };
  pairGroup?: string;
  pairPriority?: number;
}

// Podstawowe typy używane w ankiecie
export type Gender = 'male' | 'female';
export type GameLevel = 'discover' | 'explore' | 'exceed';

// Konfiguracja ankiety
export interface SurveyConfig {
  userGender: Gender | null;
  partnerGender: Gender | null;
  gameLevel: GameLevel | null;
  isConfigComplete: boolean;
}

// Typ kontekstu ankiety
export interface SurveyContextType {
  currentQuestionIndex: number;
  totalQuestions: number;
  questions: Question[];
  filteredQuestions: Question[];
  answers: Record<string, number>;
  setAnswer: (questionId: string, value: number) => void;
  saveAnswer: (isPartnerSurvey?: boolean) => Promise<void>;
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
  surveyConfig: SurveyConfig;
  showInstructions: boolean;
  completeInstructions: () => void;
  isPartnerSurvey: boolean;
  setOrderId: (orderId: string) => string;
  getOrderId: () => string | undefined;
}
