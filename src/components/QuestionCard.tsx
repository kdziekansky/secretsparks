import React, { useState } from 'react';
import RatingScale from './RatingScale';
import { useSurvey } from '@/contexts/SurveyContext';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const QuestionCard: React.FC = () => {
  const {
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useSurvey();
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // UWAGA: Bezpośrednio sprawdzamy undefined, nie null
  const hasAnswer = currentQuestion && 
                    answers[currentQuestion.id] !== undefined;
  
  const handleChange = (value: number) => {
    if (currentQuestion) {
      console.log("Setting answer for", currentQuestion.id, "to", value);
      setAnswer(currentQuestion.id, value);
    }
  };
  
  const handleNext = () => {
    // Dodatkowe zabezpieczenie
    if (!hasAnswer) {
      alert("Wybierz opcję, aby kontynuować");
      return;
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      if (isLastQuestion) {
        localStorage.setItem('survey-completed', 'true');
        window.location.href = '/survey#thank-you';
      } else {
        nextQuestion();
        setShowFullDescription(false);
      }
      setIsAnimating(false);
    }, 300);
  };
  
  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      prevQuestion();
      setShowFullDescription(false);
      setIsAnimating(false);
    }, 300);
  };
  
  if (!currentQuestion) return null;
  
  const truncateDescription = (text: string, length = 150) => {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  };
  
  return (
    <div className={`glass-panel w-full max-w-4xl transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100 animate-slide-up'}`}>
      <div className="flex flex-col md:flex-row">
       {/* Left side - Illustration */}
<div className="md:w-2/5 p-6 flex items-center justify-center bg-secondary/30 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
  <div className="w-full max-w-xs bg-secondary/50 rounded-lg flex items-center justify-center text-muted-foreground" 
       style={{ aspectRatio: '3/5' }}>
    <span>Ilustracja {currentQuestion.id.replace(/\D/g, '')}</span>
  </div>
</div>
        
        {/* Right side - Question and rating */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-medium mb-2">
              Co o tym myślisz?
            </h2>
            <h3 className="text-lg sm:text-xl font-bold text-primary">
              {currentQuestion.text}
            </h3>
          </div>
          
          {currentQuestion.description && (
            <div className="mb-6 text-gray-700">
              {showFullDescription ? (
                <p className="text-sm">{currentQuestion.description}</p>
              ) : (
                <p className="text-sm">{truncateDescription(currentQuestion.description)}</p>
              )}
              
              {currentQuestion.description.length > 150 && (
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="flex items-center mt-2 text-primary text-sm font-medium"
                >
                  {showFullDescription ? (
                    <>
                      <span>Zwiń</span>
                      <ChevronUp className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      <span>czytaj więcej</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
          
          <div className="mt-auto">
            <RatingScale
              value={answers[currentQuestion.id] || null}
              onChange={handleChange}
            />
            
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                className={`flex items-center gap-2 px-4 py-2 rounded-full 
                          transition-all duration-200 ${isFirstQuestion 
                          ? 'opacity-0 cursor-default' 
                          : 'hover:bg-secondary'}`}
                disabled={isFirstQuestion}
                aria-hidden={isFirstQuestion}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Wstecz</span>
              </button>
              
              {/* Super uproszczona wersja przycisku */}
              <button
                onClick={handleNext}
                type="button"
                style={{
                  backgroundColor: hasAnswer ? (isLastQuestion ? '#800000' : '#000') : '#ccc',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '9999px',
                  cursor: hasAnswer ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  opacity: hasAnswer ? 1 : 0.5
                }}
              >
                <span style={{fontSize: '14px'}}>{isLastQuestion ? 'Zakończ' : 'Zapisz odpowiedź'}</span>
                <ArrowRight style={{width: '16px', height: '16px'}} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;  