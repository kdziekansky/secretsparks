
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, CheckCircle, ShieldCheck, SendHorizonal, FileText } from 'lucide-react';

const SurveyInstruction: React.FC = () => {
  const { completeInstructions } = useSurvey();
  
  return (
    <div className="glass-panel w-full max-w-4xl p-8 animate-slide-up">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Witaj w ankiecie Secret Sparks!</h1>
        
        <div className="my-6 w-full space-y-6">
          {/* Instrukcje w formie kroków */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/30 p-6 rounded-lg flex flex-col items-start text-left">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">1. Odpowiedz szczerze</h3>
              </div>
              <p>
                Odpowiedz na pytania zgodnie ze swoimi prawdziwymi preferencjami i pragnieniami. 
                Im bardziej szczere odpowiedzi, tym lepiej dopasowany będzie raport.
              </p>
            </div>
            
            <div className="bg-card/30 p-6 rounded-lg flex flex-col items-start text-left">
              <div className="flex items-center mb-3">
                <ShieldCheck className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">2. Prywatność gwarantowana</h3>
              </div>
              <p>
                Twój partner/-rka nie zobaczy Twoich indywidualnych odpowiedzi. 
                Otrzymacie wspólny raport pokazujący tylko obszary dopasowania.
              </p>
            </div>
            
            <div className="bg-card/30 p-6 rounded-lg flex flex-col items-start text-left">
              <div className="flex items-center mb-3">
                <SendHorizonal className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">3. Wyślij zaproszenie</h3>
              </div>
              <p>
                Po wypełnieniu ankiety, otrzymasz link, który możesz wysłać do swojego partnera/-rki, 
                aby również wypełnił(a) ankietę.
              </p>
            </div>
            
            <div className="bg-card/30 p-6 rounded-lg flex flex-col items-start text-left">
              <div className="flex items-center mb-3">
                <FileText className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold">4. Otrzymaj raport</h3>
              </div>
              <p>
                Po wypełnieniu ankiet przez Was oboje, otrzymacie szczegółowy raport 
                pokazujący Wasze preferencje i dopasowanie.
              </p>
            </div>
          </div>
          
          {/* Sekcja z ceną */}
          <div className="bg-secondary/30 p-6 rounded-lg my-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Koszt usługi</h2>
            <p className="text-3xl font-bold text-primary mb-2">29 zł</p>
            <p className="text-sm opacity-80">Jednorazowa opłata obejmuje obie ankiety i pełny raport</p>
            
            <div className="mt-4 text-xs text-left text-muted-foreground">
              <p>* Płatność dokonasz po wypełnieniu ankiety.</p>
              <p>* Raport będzie dostępny po wypełnieniu ankiet przez oboje partnerów.</p>
            </div>
          </div>
          
          {/* Sekcja "Co zawiera raport" */}
          <div className="bg-card/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Co zawiera raport:</h2>
            <ul className="text-left space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>Wspólne fascynacje i preferencje</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>Strefy odkrywania i eksperymentowania</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>Mapa komfortu z oznaczeniem obszarów idealnego dopasowania</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>Inspiracje i scenariusze na wspólne odkrywanie</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>Wskazówki jak rozpocząć rozmowę o wzajemnych pragnieniach</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <Button 
            onClick={completeInstructions} 
            className="px-8 py-6 text-lg"
          >
            Rozpocznij ankietę
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyInstruction;
