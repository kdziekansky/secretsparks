
import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { User, UserCircle, Smile, Zap, SmilePlus, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { Gender, GameLevel } from '@/types/survey';

const SurveyConfig: React.FC = () => {
  const { 
    surveyConfig, 
    setUserGender, 
    setPartnerGender, 
    setGameLevel, 
    completeConfig 
  } = useSurvey();

  const { userGender, partnerGender, gameLevel } = surveyConfig;
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const canContinue = userGender !== null && partnerGender !== null && gameLevel !== null && ageConfirmed;

  // Dodajemy funkcję sprawdzającą dostępność kombinacji płci
  const checkGenderCombination = (userGender: Gender | null, partnerGender: Gender | null) => {
    if (userGender === 'female' && partnerGender === 'female') {
      toast.error('Ankieta dla par kobiet nie jest jeszcze aktywna');
      return false;
    }
    if (userGender === 'male' && partnerGender === 'male') {
      toast.error('Ankieta dla par mężczyzn nie jest jeszcze aktywna');
      return false;
    }
    return true;
  };

  // Modyfikujemy funkcje ustawiające płeć, dodając możliwość cofnięcia wyboru
  const handleSetPartnerGender = (gender: Gender) => {
    // Jeśli ta sama płeć jest już wybrana, usuwamy wybór
    if (partnerGender === gender) {
      setPartnerGender(null);
      return;
    }
    
    if (checkGenderCombination(userGender, gender)) {
      setPartnerGender(gender);
    }
  };

  const handleSetUserGender = (gender: Gender) => {
    // Jeśli ta sama płeć jest już wybrana, usuwamy wybór
    if (userGender === gender) {
      setUserGender(null);
      return;
    }
    
    if (checkGenderCombination(gender, partnerGender)) {
      setUserGender(gender);
    }
  };

  return (
    <div className="glass-panel w-full max-w-4xl p-8 animate-slide-up">
      <h1 className="text-3xl font-bold mb-8 text-center">Kim jesteście?</h1>
      
      <div className="space-y-10">
        {/* User Gender Selection */}
        <div>
          <h2 className="text-xl font-medium mb-4">Twoja płeć</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSetUserGender('female')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                userGender === 'female' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              } ${partnerGender === 'female' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={partnerGender === 'female'}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mr-4">
                <User className="w-6 h-6 text-pink-500" />
              </div>
              <span>Kobieta</span>
              {userGender === 'female' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSetUserGender('male')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                userGender === 'male' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              } ${partnerGender === 'male' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={partnerGender === 'male'}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <UserCircle className="w-6 h-6 text-blue-500" />
              </div>
              <span>Mężczyzna</span>
              {userGender === 'male' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
          </div>
        </div>

        {/* Partner Gender Selection */}
        <div>
          <h2 className="text-xl font-medium mb-4">Płeć partnerki/partnera</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSetPartnerGender('female')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                partnerGender === 'female' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              } ${userGender === 'female' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={userGender === 'female'}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mr-4">
                <User className="w-6 h-6 text-pink-500" />
              </div>
              <span>Kobieta</span>
              {partnerGender === 'female' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSetPartnerGender('male')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                partnerGender === 'male' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              } ${userGender === 'male' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={userGender === 'male'}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <UserCircle className="w-6 h-6 text-blue-500" />
              </div>
              <span>Mężczyzna</span>
              {partnerGender === 'male' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
          </div>
        </div>

        {/* Game Level Selection */}
        <div>
          <h2 className="text-xl font-medium mb-4">Poziom gry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setGameLevel(gameLevel === 'discover' ? null : 'discover')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                gameLevel === 'discover' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mr-4">
                <Smile className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <span>Odkrywaj intymność</span>
              </div>
              {gameLevel === 'discover' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setGameLevel(gameLevel === 'explore' ? null : 'explore')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                gameLevel === 'explore' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4">
                <SmilePlus className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <span>Eksploruj pragnienia</span>
              </div>
              {gameLevel === 'explore' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setGameLevel(gameLevel === 'exceed' ? null : 'exceed')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                gameLevel === 'exceed' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mr-4">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <span>Przekraczaj granice</span>
              </div>
              {gameLevel === 'exceed' && (
                <X className="w-5 h-5 ml-auto text-gray-500 hover:text-red-500" />
              )}
            </button>
          </div>
        </div>
        
        {/* Age Confirmation */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-3 border border-accent/40 bg-accent/10 rounded-lg p-5 hover:border-accent/60 transition-all max-w-md">
            <Checkbox 
              id="ageConfirmation" 
              checked={ageConfirmed}
              onCheckedChange={(checked) => setAgeConfirmed(checked as boolean)}
              className="h-5 w-5 data-[state=checked]:bg-accent"
            />
            <Label 
              htmlFor="ageConfirmation" 
              className="text-foreground font-medium cursor-pointer"
            >
              Oświadczam, że ukończyłem/-am 18 rok życia
            </Label>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <Button 
          onClick={completeConfig} 
          disabled={!canContinue}
          className="px-8 py-6 text-lg"
        >
          Wypełnij ankietę
        </Button>
        
        {!ageConfirmed && userGender !== null && partnerGender !== null && gameLevel !== null && (
          <p className="text-muted-foreground text-sm mt-4 text-center">
            Aby kontynuować, musisz potwierdzić że ukończyłeś/-aś 18 lat
          </p>
        )}
      </div>
    </div>
  );
};

export default SurveyConfig;
