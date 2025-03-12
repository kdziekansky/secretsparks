import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RatingScale from './RatingScale';
import { useSurvey } from '@/contexts/SurveyContext';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface QuestionCardProps {
  isPartnerSurvey?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ isPartnerSurvey = false }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const partnerToken = searchParams.get('token');
  
  const {
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isFirstQuestion,
    isLastQuestion,
    saveAnswer,
    getOrderId
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
  
  // Directly check for undefined, not null
  const hasAnswer = currentQuestion && 
                    answers[currentQuestion.id] !== undefined;
  
  const handleChange = (value: number) => {
    if (currentQuestion) {
      console.log("Setting answer for", currentQuestion.id, "to", value);
      setAnswer(currentQuestion.id, value);
    }
  };
  
  const handleNext = async () => {
    // Additional protection
    if (!hasAnswer) {
      toast.error("Wybierz opcję, aby kontynuować");
      return;
    }
    
    setIsAnimating(true);
    
    // If it's the last question, save the answer before redirecting
    if (isLastQuestion) {
      if (isPartnerSurvey) {
        try {
          await saveAnswer(true);
          console.log('Final answer saved successfully');
        } catch (error) {
          console.error('Error saving final answer:', error);
          toast.error("Wystąpił błąd podczas zapisywania odpowiedzi");
        }
      }
      
      setTimeout(() => {
        // If it's a partner survey, redirect to thank you page WITHOUT orderId
        if (isPartnerSurvey) {
          console.log('Partner survey completed, redirecting to thank you page');
          navigate('/thank-you');
        } else {
          console.log('Navigating to payment page with all answers:', answers);
          navigate('/payment');
        }
        setIsAnimating(false);
      }, 300);
    } else {
      // For non-last questions, just move to the next one
      setTimeout(() => {
        nextQuestion();
        setShowFullDescription(false);
        setIsAnimating(false);
      }, 300);
    }
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
        {/* Left side - Illustration - z gradientowym tłem */}
        <div className="md:w-2/5 p-0 flex items-center justify-center bg-gradient-to-br from-accent/30 to-accent/10 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
          {currentQuestion.illustration && !imageError ? (
            <div className="w-full h-full rounded-lg overflow-hidden" style={{ aspectRatio: '2/3' }}>
              {/* Placeholder while image loads */}
              {!imageLoaded && (
                <div className="w-full h-full bg-accent/20 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                  <span>Ładowanie...</span>
                </div>
              )}
              
              {/* Try to display SVG using object tag if it's an SVG */}
              {currentQuestion.illustration.toLowerCase().endsWith('.svg') ? (
                <object 
                  data={currentQuestion.illustration} 
                  type="image/svg+xml"
                  className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  aria-label={currentQuestion.text}
                  style={{ width: '100%', height: '100%', minHeight: '300px' }}
                >
                  <div className="w-full h-full bg-accent/20 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                    <span>Ilustracja {questionNumber || currentQuestion.id}</span>
                  </div>
                </object>
              ) : (
                /* Normal image for non-SVG */
                <img 
                  src={currentQuestion.illustration} 
                  alt={currentQuestion.text} 
                  className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ width: '100%', height: '100%', minHeight: '300px' }}
                />
              )}
            </div>
          ) : (
            <div 
              className="w-full h-full bg-accent/20 flex flex-col items-center justify-center text-muted-foreground" 
              style={{ minHeight: '300px' }}
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
            <div className="mb-6">
              {showFullDescription ? (
                <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{truncateDescription(currentQuestion.description)}</p>
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
              
              {/* Zmodyfikowany przycisk z nowym wyglądem - bardziej widoczny, czerwony */}
              <Button
                onClick={handleNext}
                disabled={!hasAnswer}
                variant="destructive" 
                className="px-6 py-2 rounded-full transition-all duration-200 font-medium flex items-center gap-2"
              >
                <span>{nextButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
