
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, CheckCircle, Shield, SendHorizonal, FileText } from 'lucide-react';

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
                Po wypełnieniu ankiety otrzymasz link, który możesz wysłać do swojego partnera/-rki, 
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
                pokazujący Wasze preferencje i dopasowanie.
              </p>
            </div>
          </div>
          
          {/* Sekcja z ceną - wyróżniona */}
          <div className="bg-primary/10 p-5 md:p-6 rounded-lg my-4 md:my-6 w-full max-w-md mx-auto shadow-md">
            <div className="flex flex-col items-center">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Koszt usługi</h2>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-2">29 zł</p>
              <p className="text-sm opacity-80 text-center">Jednorazowa opłata obejmuje obie ankiety i pełny raport</p>
              
              <div className="mt-3 text-xs text-center text-muted-foreground space-y-1">
                <p>* Płatność dokonasz po wypełnieniu ankiety</p>
                <p>* Raport będzie dostępny po wypełnieniu ankiet przez oboje partnerów</p>
              </div>
            </div>
          </div>
          
          {/* Sekcja "Co zawiera raport" */}
          <div className="bg-card/30 p-5 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-center">Co zawiera raport:</h2>
            <ul className="text-left space-y-2 max-w-lg mx-auto">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base">Wspólne fascynacje i preferencje</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base">Strefy odkrywania i eksperymentowania</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base">Mapa komfortu z oznaczeniem obszarów idealnego dopasowania</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base">Inspiracje i scenariusze na wspólne odkrywanie</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base">Wskazówki jak rozpocząć rozmowę o wzajemnych pragnieniach</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <Button 
            onClick={completeInstructions} 
            className="px-6 py-2 md:px-8 md:py-6 text-base md:text-lg shadow-md hover:shadow-lg transition-shadow duration-200"
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
