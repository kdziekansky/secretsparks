import React from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import SurveyConfig from '@/components/SurveyConfig';

const SurveyPage: React.FC = () => {
  const { 
    progress, 
    isInConfigurationMode 
  } = useSurvey();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      {!isInConfigurationMode && (
        <div className="w-full max-w-xl mb-8">
          <ProgressBar progress={progress} />
        </div>
      )}
      
      {isInConfigurationMode ? (
        <SurveyConfig />
      ) : (
        <QuestionCard />
      )}
    </div>
  );
};

export default SurveyPage;