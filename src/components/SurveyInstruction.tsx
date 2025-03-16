
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
          
          {/* Sekcja z ceną - wyróżniona i atrakcyjniejsza */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 md:p-8 rounded-2xl my-6 md:my-8 w-full mx-auto shadow-lg border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="flex flex-col items-center relative z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-gradient-primary">Koszt usługi</h2>
              
              <div className="flex items-center justify-center mb-3">
                <span className="text-3xl md:text-5xl font-bold text-primary">29 zł</span>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary ml-2 opacity-80" />
              </div>
              
              <p className="text-sm md:text-base opacity-90 text-center font-medium mb-4">
                Jednorazowa opłata obejmuje obie ankiety i pełny raport
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl text-sm text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Płatność po wypełnieniu ankiety</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <CheckCircle className="h-4 w-4 text-primary/70 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Raport po obu ankietach</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sekcja "Co zawiera raport" - nowa wersja */}
          <div className="bg-card/20 p-6 md:p-8 rounded-lg shadow-md border border-primary/5 relative">
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-32 h-32 md:w-48 md:h-48 bg-primary/5 rounded-full blur-3xl"></div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-center relative z-10">Co zawiera raport:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto relative z-10">
              <div className="flex items-start bg-card/30 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base ml-3">Wspólne fascynacje i preferencje</span>
              </div>
              
              <div className="flex items-start bg-card/30 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base ml-3">Strefy odkrywania i eksperymentowania</span>
              </div>
              
              <div className="flex items-start bg-card/30 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base ml-3">Mapa komfortu z oznaczeniem obszarów idealnego dopasowania</span>
              </div>
              
              <div className="flex items-start bg-card/30 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base ml-3">Inspiracje i scenariusze na wspólne odkrywanie</span>
              </div>
              
              <div className="flex items-start bg-card/30 p-4 rounded-lg col-span-1 md:col-span-2 hover:shadow-md transition-shadow duration-200">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base ml-3">Wskazówki jak rozpocząć rozmowę o wzajemnych pragnieniach</span>
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
