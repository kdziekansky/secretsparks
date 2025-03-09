import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import ThankYou from '@/components/ThankYou';
import SurveyConfig from '@/components/SurveyConfig';

const SurveyPage: React.FC = () => {
  const { 
    progress, 
    filteredQuestions, 
    answers, 
    currentQuestionIndex,
    isLastQuestion,
    isInConfigurationMode 
  } = useSurvey();
  
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Sprawdź czy pokazać ThankYou bazując na URL hash
  useEffect(() => {
    if (window.location.hash === '#thank-you') {
      setShowThankYou(true);
    }
  }, []);
  
  // Dodatkowy efekt do opóźnionego pokazania ThankYou po zakończeniu ankiety
  useEffect(() => {
    const surveyCompleted = localStorage.getItem('survey-completed') === 'true';
    const allAnswered = filteredQuestions.length > 0 && 
      filteredQuestions.every(q => answers[q.id] !== undefined);
    
    if ((surveyCompleted || (allAnswered && isLastQuestion)) && !showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [filteredQuestions, answers, currentQuestionIndex, isLastQuestion, showThankYou]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      {!isInConfigurationMode && !showThankYou && (
        <div className="w-full max-w-xl mb-8">
          <ProgressBar progress={progress} />
        </div>
      )}
      
      {isInConfigurationMode ? (
        <SurveyConfig />
      ) : showThankYou ? (
        <ThankYou />
      ) : (
        <QuestionCard />
      )}
    </div>
  );
};

export default SurveyPage;