
import React from 'react';
import { useSurvey, Gender, GameLevel } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';

const SurveyConfig: React.FC = () => {
  const { 
    surveyConfig, 
    setUserGender, 
    setPartnerGender, 
    setGameLevel, 
    completeConfig 
  } = useSurvey();

  const { userGender, partnerGender, gameLevel } = surveyConfig;

  const canContinue = userGender !== null && partnerGender !== null && gameLevel !== null;

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
              onClick={() => setUserGender('female')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                userGender === 'female' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/e92b6b7b-ead0-4fcb-b3d6-913c7f8ce7f6.png"
                  alt="Kobieta"
                  className="w-6 h-6"
                />
              </div>
              <span>Kobieta</span>
            </button>
            <button
              type="button"
              onClick={() => setUserGender('male')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                userGender === 'male' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/ef0a27c7-92d2-4c6c-950e-8f9afc2db017.png"
                  alt="Mężczyzna"
                  className="w-6 h-6"
                />
              </div>
              <span>Mężczyzna</span>
            </button>
          </div>
        </div>

        {/* Partner Gender Selection */}
        <div>
          <h2 className="text-xl font-medium mb-4">Płeć partnerki/partnera</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPartnerGender('female')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                partnerGender === 'female' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/e92b6b7b-ead0-4fcb-b3d6-913c7f8ce7f6.png"
                  alt="Kobieta" 
                  className="w-6 h-6"
                />
              </div>
              <span>Kobieta</span>
            </button>
            <button
              type="button"
              onClick={() => setPartnerGender('male')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                partnerGender === 'male' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/ef0a27c7-92d2-4c6c-950e-8f9afc2db017.png"
                  alt="Mężczyzna"
                  className="w-6 h-6"
                />
              </div>
              <span>Mężczyzna</span>
            </button>
          </div>
        </div>

        {/* Game Level Selection */}
        <div>
          <h2 className="text-xl font-medium mb-4">Poziom gry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setGameLevel('discover')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                gameLevel === 'discover' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/9b5a3cda-3e60-4b51-8671-07e4553a61bf.png"
                  alt="Odkrywaj intymność"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <span>Odkrywaj intymność</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setGameLevel('explore')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                gameLevel === 'explore' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/fd8d6e89-fe8f-49d6-bb18-eb3b9f7d4e43.png"
                  alt="Eksploruj pragnienia"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <span>Eksploruj pragnienia</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setGameLevel('exceed')}
              className={`flex items-center p-4 rounded-lg border transition-all ${
                gameLevel === 'exceed' 
                  ? 'border-primary bg-primary/10 font-medium' 
                  : 'border-border hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mr-4">
                <img 
                  src="/lovable-uploads/8e54bda2-9432-491e-ae37-81c6faec0b75.png"
                  alt="Przekraczaj granice"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <span>Przekraczaj granice</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button 
          onClick={completeConfig} 
          disabled={!canContinue}
          className="px-8 py-6 text-lg"
        >
          Rozpocznij ankietę
        </Button>
      </div>
    </div>
  );
};

export default SurveyConfig;
