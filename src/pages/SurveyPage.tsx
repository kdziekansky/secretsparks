
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SurveyInstruction from '@/components/SurveyInstruction';
import SurveyConfig from '@/components/SurveyConfig';
import PartnerWelcome from '@/components/PartnerWelcome';
import QuestionCard from '@/components/QuestionCard';
import ThankYou from '@/components/ThankYou';
import { useSurvey } from '@/contexts/SurveyContext';
import { cn } from '@/lib/utils';
import { Question } from '@/types/survey';

// Dane przykładowe dla demonstracji
const demoQuestions: Question[] = [
  {
    id: "q1",
    title: "Czy lubisz eksperymentować z nowymi pozycjami?",
    description: "Pytanie dotyczy Twojej otwartości na wypróbowywanie nowych pozycji seksualnych z partnerem/partnerką."
  },
  {
    id: "q2",
    title: "Jak oceniasz znaczenie gry wstępnej?",
    description: "Gra wstępna to wszystkie czynności (np. pocałunki, pieszczoty) przed stosunkiem, które budują napięcie i podniecenie."
  },
  {
    id: "q3",
    title: "Czy interesuje Cię używanie zabawek erotycznych podczas stosunku?",
    description: "Zabawki erotyczne mogą urozmaicić życie seksualne i dostarczyć nowych doznań zarówno Tobie, jak i Twojemu partnerowi/partnerce."
  },
  {
    id: "q4",
    title: "Jak ważna jest dla Ciebie dominacja w łóżku?",
    description: "Dominacja oznacza przejęcie kontroli nad przebiegiem stosunku, decydowanie o pozycjach, tempie itp."
  },
  {
    id: "q5",
    title: "Czy interesuje Cię seks w miejscach publicznych?",
    description: "Seks w miejscach publicznych wiąże się z ryzykiem bycia przyłapanym, co dla niektórych osób jest dodatkowym źródłem podniecenia.",
    image: "/images/illustrations/techniques/Seks w miejscu publicznym (explore, exceed).png",
    adultContent: true
  }
];

const SurveyPage = () => {
  const { t } = useTranslation();
  const { isConfigCompleted, isPartnerMode, isSurveyCompleted, resetSurvey } = useSurvey();
  const [currentStep, setCurrentStep] = useState<'instruction' | 'config' | 'questions' | 'thankYou'>('instruction');
  const { partnerToken } = useParams();
  const navigate = useNavigate();
  
  // Przykładowe dane zamówienia - w rzeczywistej aplikacji pochodziłyby z API
  const orderDetails = partnerToken ? {
    userName: "Anna",
    partnerName: "Tomasz",
    userGender: "female" as const,
    partnerGender: "male" as const,
    gameLevel: "discover",
    orderId: "ORD-1234"
  } : undefined;
  
  // Efekt dla obsługi trybu partnera
  useEffect(() => {
    if (partnerToken) {
      console.log("Partner token detected:", partnerToken);
      // Tutaj w rzeczywistej aplikacji weryfikowalibyśmy token
      if (currentStep === 'instruction') {
        setCurrentStep('config');
      }
    }
  }, [partnerToken, currentStep]);
  
  // Efekt dla śledzenia postępu ankiety
  useEffect(() => {
    if (isConfigCompleted && currentStep === 'config') {
      setCurrentStep('questions');
    }
    
    if (isSurveyCompleted && currentStep === 'questions') {
      setCurrentStep('thankYou');
    }
  }, [isConfigCompleted, isSurveyCompleted, currentStep]);
  
  const handleStartSurvey = () => {
    setCurrentStep('config');
  };
  
  const handleRestartSurvey = () => {
    resetSurvey();
    setCurrentStep('instruction');
    navigate('/survey');
  };
  
  // Komponenty na podstawie etapu
  const renderStep = () => {
    switch (currentStep) {
      case 'instruction':
        return <SurveyInstruction onStart={handleStartSurvey} />;
        
      case 'config':
        if (isPartnerMode || partnerToken) {
          return <PartnerWelcome orderDetails={orderDetails} />;
        }
        return <SurveyConfig />;
        
      case 'questions':
        return <SurveyQuestions />;
        
      case 'thankYou':
        return <ThankYou onRestart={handleRestartSurvey} />;
        
      default:
        return <SurveyInstruction onStart={handleStartSurvey} />;
    }
  };
  
  // Funkcja pomocnicza określająca klasę tła na podstawie kroku
  const getBackgroundClass = () => {
    switch (currentStep) {
      case 'instruction':
        return 'bg-gradient-to-b from-[#05050a] to-[#121217]';
      case 'config':
        return 'bg-gradient-to-br from-[#05050a] to-[#1a1a2e]';
      case 'questions':
        return 'bg-[#080811]';
      case 'thankYou':
        return 'bg-gradient-to-b from-[#05050a] to-[#1a1a2e]';
      default:
        return 'bg-[#05050a]';
    }
  };
  
  return (
    <div className={cn('min-h-screen flex flex-col', getBackgroundClass())}>
      <Header />
      
      <main className="flex-grow py-8 md:py-12 px-4">
        <div className="container mx-auto">
          {renderStep()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Komponent obsługujący pytania ankiety
const SurveyQuestions = () => {
  const { currentQuestionIndex, nextQuestion: goToNextQuestion, prevQuestion: goToPrevQuestion, totalQuestions, completeSurvey } = useSurvey();
  
  const handleNext = () => {
    if (currentQuestionIndex < demoQuestions.length - 1) {
      goToNextQuestion();
    } else {
      completeSurvey();
    }
  };
  
  const handlePrev = () => {
    goToPrevQuestion();
  };
  
  const currentQuestion = demoQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === demoQuestions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  return (
    <QuestionCard
      question={currentQuestion}
      onNext={handleNext}
      onPrev={handlePrev}
      isLast={isLastQuestion}
      isFirst={isFirstQuestion}
    />
  );
};

export default SurveyPage;
