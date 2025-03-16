
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, CheckCircle, Shield, SendHorizonal, FileText, Sparkles } from 'lucide-react';

const SurveyInstruction: React.FC = () => {
  const { completeInstructions } = useSurvey();
  
  return (
    <div className="glass-panel w-full max-w-3xl p-6 md:p-8 animate-slide-up bg-card/90 shadow-lg border border-primary/10">
      <div className="flex flex-col items-center text-center">
        {/* Logo i tytuł */}
        <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-pink-50 rounded-full mb-4">
          <Heart className="w-7 h-7 md:w-8 md:h-8 text-pink-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">Witaj w ankiecie Secret Sparks!</h1>
        
        {/* Instrukcje w formie kroków - siatka 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full mb-8">
          {/* Szczere odpowiedzi */}
          <div className="flex items-start text-left">
            <div className="mr-3 mt-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 text-red-500">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Odpowiedz szczerze</h3>
              <p className="text-sm text-muted-foreground">
                Odpowiedz na pytania zgodnie ze swoimi prawdziwymi preferencjami i pragnieniami. 
                Im bardziej szczere odpowiedzi, tym lepszy rezultat.
              </p>
            </div>
          </div>
          
          {/* Pełna dyskrecja */}
          <div className="flex items-start text-left">
            <div className="mr-3 mt-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 text-red-500">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Pełna dyskrecja</h3>
              <p className="text-sm text-muted-foreground">
                Twój partner/-rka nie zobaczy Twoich indywidualnych odpowiedzi. 
                Otrzymacie wspólny raport pokazujący tylko obszary dopasowania.
              </p>
            </div>
          </div>
          
          {/* Wyślij zaproszenie */}
          <div className="flex items-start text-left">
            <div className="mr-3 mt-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 text-red-500">
                <SendHorizonal className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Wyślij zaproszenie</h3>
              <p className="text-sm text-muted-foreground">
                Po wypełnieniu ankiety i opłaceniu zamówienia, wyślemy link do Twojego partnera/-rki, 
                aby również wypełnił(a) ankietę.
              </p>
            </div>
          </div>
          
          {/* Otrzymaj raport */}
          <div className="flex items-start text-left">
            <div className="mr-3 mt-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 text-red-500">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Otrzymaj raport</h3>
              <p className="text-sm text-muted-foreground">
                Po wypełnieniu ankiet przez Was oboje, otrzymacie szczegółowy raport 
                i gotowe scenariusze. Odkryjcie się na nowo.
              </p>
            </div>
          </div>
        </div>
        
        {/* Sekcja z ceną - stylizowany panel */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl w-full mx-auto shadow-md border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2 text-center">Koszt usługi</h2>
            
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl font-bold text-destructive">29 zł</span>
              <Sparkles className="w-5 h-5 text-destructive ml-2 opacity-80" />
            </div>
            
            <p className="text-sm opacity-90 text-center font-medium mb-4">
              Jednorazowa opłata za raport nieograniczony czasowo
            </p>
            
            {/* Grid z listą korzyści */}
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 w-full">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Płatność po wypełnieniu ankiety</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Spersonalizowany praktyczny raport</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Wspólne fascynacje i preferencje</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Scenariusze do odkrycia</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Mapa komfortu z oznaczeniami</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-destructive mr-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Życie seksualne na nowym poziomie</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Przycisk rozpoczęcia */}
        <div className="mt-8 w-full">
          <Button 
            onClick={completeInstructions} 
            className="w-full py-5 text-lg font-medium bg-destructive hover:bg-destructive/90 transition-all duration-200"
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
