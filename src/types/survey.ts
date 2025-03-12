
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
  illustration?: string;
  forConfig?: {
    userGender?: Gender;
    partnerGender?: Gender;
    gameLevel?: GameLevel[];
  };
  pairGroup?: string;
  pairPriority?: number;
  together?: boolean; // Oznaczenie pytań, które powinny występować parami
}

export interface SurveyContextType {
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
  saveAnswer: (isPartnerSurvey?: boolean) => Promise<void>;
  setOrderId: (orderId: string) => void;
  getOrderId: () => string | null;
}
