import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, ArrowRightIcon, InfoIcon, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RatingScale } from '@/components/RatingScale';
import { useSurvey } from '@/contexts/SurveyContext';
import { Question } from '@/types/survey';

interface QuestionCardProps {
  question: Question;
  onNext: () => void;
  onPrev: () => void;
  isLast: boolean;
  isFirst: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onNext, 
  onPrev, 
  isLast,
  isFirst 
}) => {
  const { t } = useTranslation();
  const { answers, setAnswer, currentStep, totalSteps } = useSurvey();
  const [showDescription, setShowDescription] = useState(false);
  const [imageVisible, setImageVisible] = useState(!question.adultContent);
  const answer = answers[question.id] || 3;

  useEffect(() => {
    console.log(`Question ${question.id} mounted`);
    return () => {
      console.log(`Question ${question.id} unmounted`);
    };
  }, [question.id]);

  const handleChange = (value: number) => {
    setAnswer(question.id, value);
  };

  const handleNext = () => {
    setAnswer(question.id, answer);
    onNext();
  };
  
  const handleImageError = () => {
    console.error("Failed to load image:", question.image);
  };

  return (
    <div className="glass-card p-6 sm:p-8 md:p-10 w-full max-w-4xl mx-auto flex flex-col">
      <div className="flex flex-col space-y-4">
        
        {/* Question number and progress */}
        <div className="text-sm text-muted-foreground">
          {currentStep} / {totalSteps}
        </div>
        
        {/* Question title */}
        <h2 className="text-xl md:text-2xl font-bold mb-2">{question.title}</h2>
        
        {/* Question description toggle */}
        {question.description && (
          <div className="mb-4">
            <button 
              onClick={() => setShowDescription(!showDescription)}
              className="text-primary hover:underline flex items-center text-sm font-medium"
            >
              {showDescription ? t('survey.question.collapse') : t('survey.question.readMore')} 
              <InfoIcon className="ml-1 h-3 w-3" />
            </button>
            
            {showDescription && (
              <div className="mt-3 text-muted-foreground p-4 bg-card rounded-md">
                <p>{question.description}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Question image */}
        {question.image && (
          <div className="mb-6 flex justify-center">
            {imageVisible ? (
              <div className="max-h-64 overflow-hidden rounded-lg">
                <img 
                  src={question.image} 
                  alt={question.title} 
                  className="w-full object-cover"
                  onError={handleImageError}
                />
              </div>
            ) : (
              <button 
                onClick={() => setImageVisible(true)}
                className="py-3 px-6 bg-card/50 rounded-lg flex items-center gap-2 text-muted-foreground hover:bg-card"
              >
                <EyeIcon className="h-5 w-5" />
                <span>{t('survey.question.adultContent')}</span>
              </button>
            )}
          </div>
        )}
        
        {/* Rating question */}
        <div className="my-6">
          <h3 className="text-lg font-medium mb-4">{t('survey.question.whatDoYouThink')}</h3>
          <RatingScale value={answer} onChange={handleChange} />
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {!isFirst ? (
            <Button 
              variant="outline" 
              onClick={onPrev}
              className="flex items-center"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              {t('survey.question.back')}
            </Button>
          ) : <div></div>}
          
          <Button 
            onClick={handleNext}
            variant="default"
            className="flex items-center"
          >
            {isLast ? t('survey.question.finishSurvey') : t('survey.question.saveAnswer')}
            {!isLast && <ArrowRightIcon className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
