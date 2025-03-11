
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RatingScale from './RatingScale';
import { useSurvey } from '@/contexts/SurveyContext';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

interface QuestionCardProps {
  isPartnerSurvey?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ isPartnerSurvey = false }) => {
  const [searchParams] = useSearchParams();
  const partnerToken = searchParams.get('token');
  
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reset image state when question changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentQuestion?.id]);
  
  // Bezpośrednio sprawdzamy undefined, nie null
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
        // If it's a partner survey, redirect to thank you page
        if (isPartnerSurvey) {
          window.location.href = '/thank-you';
        } else {
          window.location.href = '/payment';
        }
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
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  const handleImageError = () => {
    console.error(`Failed to load image for question ${currentQuestion?.id}:`, currentQuestion?.illustration);
    setImageError(true);
    setImageLoaded(false);
  };
  
  if (!currentQuestion) return null;
  
  const truncateDescription = (text: string, length = 150) => {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  };
  
  // Get question number from ID (for placeholder)
  const questionNumber = currentQuestion.id.replace(/\D/g, '');
  
  // Adjusted button text based on whether it's a partner survey
  const nextButtonText = isLastQuestion 
    ? (isPartnerSurvey ? 'Zakończ ankietę' : 'Przejdź do płatności') 
    : 'Zapisz odpowiedź';
  
  return (
    <div className={`glass-panel w-full max-w-4xl transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100 animate-slide-up'}`}>
      <div className="flex flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="md:w-2/5 p-6 flex items-center justify-center bg-secondary/30 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          {currentQuestion.illustration && !imageError ? (
            <div className="w-full max-w-xs rounded-lg overflow-hidden" style={{ aspectRatio: '3/5' }}>
              {/* Placeholder while image loads */}
              {!imageLoaded && (
                <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                  <span>Ładowanie...</span>
                </div>
              )}
              
              {/* Try to display SVG using object tag if it's an SVG */}
              {currentQuestion.illustration.toLowerCase().endsWith('.svg') ? (
                <object 
                  data={currentQuestion.illustration} 
                  type="image/svg+xml"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  aria-label={currentQuestion.text}
                >
                  <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                    <span>Ilustracja {questionNumber || currentQuestion.id}</span>
                  </div>
                </object>
              ) : (
                /* Normal image for non-SVG */
                <img 
                  src={currentQuestion.illustration} 
                  alt={currentQuestion.text} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </div>
          ) : (
            <div 
              className="w-full max-w-xs bg-secondary/50 rounded-lg flex flex-col items-center justify-center text-muted-foreground" 
              style={{ aspectRatio: '3/5' }}
            >
              <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
              <span>Ilustracja {questionNumber || currentQuestion.id}</span>
            </div>
          )}
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
                <span style={{fontSize: '14px'}}>{nextButtonText}</span>
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
