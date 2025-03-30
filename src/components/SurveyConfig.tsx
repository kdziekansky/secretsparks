
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey, type Gender, type GameLevel } from '@/contexts/SurveyContext';
import { useTranslation } from 'react-i18next';

const SurveyConfig: React.FC = () => {
  const { t } = useTranslation();
  const { 
    setUserGender, 
    setPartnerGender, 
    setGameLevel, 
    completeConfig,
    surveyConfig 
  } = useSurvey();

  const handleUserGenderSelect = (gender: Gender) => {
    setUserGender(gender);
  };

  const handlePartnerGenderSelect = (gender: Gender) => {
    setPartnerGender(gender);
  };

  const handleGameLevelSelect = (level: GameLevel) => {
    setGameLevel(level);
  };

  const handleStartSurvey = () => {
    completeConfig();
  };

  const isButtonDisabled = !surveyConfig.userGender || !surveyConfig.partnerGender || !surveyConfig.gameLevel;
  
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="glass-card p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-12 text-center">
          Kim jesteście?
        </h1>
        
        <div className="w-full mb-8">
          <h2 className="text-lg mb-4 text-left">Twoja płeć</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.userGender === 'female' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handleUserGenderSelect('female')}
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="text-pink-500">♀</span>
              </div>
              <span>Kobieta</span>
            </button>
            
            <button
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.userGender === 'male' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handleUserGenderSelect('male')}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500">♂</span>
              </div>
              <span>Mężczyzna</span>
            </button>
          </div>
        </div>
        
        <div className="w-full mb-8">
          <h2 className="text-lg mb-4 text-left">Płeć partnerki/partnera</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.partnerGender === 'female' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handlePartnerGenderSelect('female')}
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="text-pink-500">♀</span>
              </div>
              <span>Kobieta</span>
            </button>
            
            <button
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.partnerGender === 'male' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handlePartnerGenderSelect('male')}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500">♂</span>
              </div>
              <span>Mężczyzna</span>
            </button>
          </div>
        </div>
        
        <div className="w-full mb-12">
          <h2 className="text-lg mb-4 text-left">Poziom gry</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.gameLevel === 'discover' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handleGameLevelSelect('discover')}
            >
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-xl text-yellow-500">☺</span>
              </div>
              <span>Odkrywaj intymność</span>
            </button>
            
            <button
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.gameLevel === 'explore' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handleGameLevelSelect('explore')}
            >
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="text-xl text-orange-500">🔥</span>
              </div>
              <span>Eksploruj pragnienia</span>
            </button>
            
            <button
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border ${
                surveyConfig.gameLevel === 'exceed' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border/40 hover:border-primary/50'
              }`}
              onClick={() => handleGameLevelSelect('exceed')}
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-xl text-purple-500">⚡</span>
              </div>
              <span>Przekraczaj granice</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <input 
            type="checkbox" 
            id="age-confirmation" 
            className="rounded border-border/40 bg-card/30"
          />
          <label htmlFor="age-confirmation" className="text-sm">
            Oświadczam, że ukończyłem/-am 18 rok życia
          </label>
        </div>
        
        <Button 
          onClick={handleStartSurvey} 
          className="rounded-full px-8 py-6" 
          size="lg"
          disabled={isButtonDisabled}
        >
          Wypełnij ankietę
        </Button>
      </div>
    </div>
  );
};

export default SurveyConfig;
