
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, ExternalLink } from 'lucide-react';

const SurveyInstruction: React.FC = () => {
  const { completeInstructions } = useSurvey();
  
  return (
    <div className="glass-panel w-full max-w-4xl p-8 animate-slide-up">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Witaj w ankiecie Secret Sparks!</h1>
        
        <div className="my-6 max-w-2xl text-left space-y-4">
          <p>
            Ta ankieta pomoże Wam lepiej zrozumieć swoje potrzeby i pragnienia w relacji intymnej.
          </p>
          
          <p>
            <strong>Jak to działa:</strong>
          </p>
          
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Najpierw wypełnisz krótką ankietę, odpowiadając szczerze na pytania</li>
            <li>Wyślesz zaproszenie do swojego partnera/partnerki, aby również wypełnił(a) ankietę</li>
            <li>Po wypełnieniu ankiet przez Was oboje, otrzymacie szczegółowy raport</li>
            <li>Raport pokaże Wasze preferencje, podobieństwa i różnice, a także propozycje urozmaiceń</li>
          </ul>
          
          <p className="mt-4">
            <strong>Ważne:</strong> Wszystkie odpowiedzi są poufne. Partnerzy nie widzą swoich odpowiedzi przed ukończeniem obu ankiet.
          </p>
        </div>
        
        <div className="bg-secondary/30 p-6 rounded-lg my-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Koszt usługi</h2>
          <p className="text-3xl font-bold text-primary mb-2">49 zł</p>
          <p className="text-sm opacity-80">Jednorazowa opłata obejmuje obie ankiety i pełny raport</p>
          
          <div className="mt-4 text-xs text-left text-muted-foreground">
            <p>* Płatność dokonasz po wypełnieniu ankiety.</p>
            <p>* Raport będzie dostępny po wypełnieniu ankiet przez oboje partnerów.</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col items-center">
          <Button 
            onClick={completeInstructions} 
            className="px-8 py-6 text-lg"
          >
            Rozpocznij ankietę
          </Button>
          
          <a 
            href="/terms" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm mt-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            Regulamin usługi
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SurveyInstruction;
