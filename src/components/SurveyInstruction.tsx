
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, CheckCircle, Shield, SendHorizonal, FileText, Sparkles } from 'lucide-react';

const SurveyInstruction: React.FC = () => {
  const { completeInstructions } = useSurvey();
  
  return (
    <div className="glass-panel w-full max-w-4xl p-6 md:p-8 animate-slide-up">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-full mb-4">
          <Heart className="w-7 h-7 md:w-8 md:h-8 text-pink-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Witaj w ankiecie Secret Sparks!</h1>
        
        <div className="my-4 md:my-6 w-full space-y-4 md:space-y-6">
          {/* Instrukcje w formie kroków */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">Odpowiedz szczerze</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Odpowiedz na pytania zgodnie ze swoimi prawdziwymi preferencjami i pragnieniami. 
                Im bardziej szczere odpowiedzi, tym lepszy rezultat.
              </p>
            </div>
            
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">Pełna dyskrecja</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Twój partner/-rka nie zobaczy Twoich indywidualnych odpowiedzi. 
                Otrzymacie wspólny raport pokazujący tylko obszary dopasowania.
              </p>
            </div>
            
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <SendHorizonal className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">Wyślij zaproszenie</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Po wypełnieniu ankiety i opłaceniu zamówienia, wyślemy link do Twojego partnera/-rki, 
                aby również wypełnił(a) ankietę.
              </p>
            </div>
            
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">Otrzymaj raport</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Po wypełnieniu ankiet przez Was oboje, otrzymacie szczegółowy raport 
                i gotowe scenariusze. Odkryjcie się na nowo.
              </p>
            </div>
          </div>
          
          {/* Sekcja z ceną - zmodyfikowana dla lepszego wyrównania punktów */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 md:p-6 rounded-2xl my-4 md:my-6 w-full mx-auto shadow-lg border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-gradient-primary text-center">Koszt usługi</h2>
              
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl md:text-4xl font-bold text-primary">29 zł</span>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary ml-2 opacity-80" />
              </div>
              
              <p className="text-xs md:text-sm opacity-90 text-center font-medium mb-3">
                Jednorazowa opłata za raport nieograniczony czasowo
              </p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full px-2">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">Płatność po wypełnieniu ankiety</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">Spersonalizowany praktyczny raport</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">Wspólne fascynacje i preferencje</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">Scenariusze do odkrycia</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">Mapa komfortu z oznaczeniami</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-1.5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">Życie seksualne na nowym poziomie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 flex flex-col items-center">
          <Button 
            onClick={completeInstructions} 
            className="px-6 py-2 md:px-8 md:py-6 text-base md:text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            Rozpocznij ankietę
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyInstruction;
