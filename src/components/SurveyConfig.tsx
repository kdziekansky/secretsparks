
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSurvey } from '@/contexts/SurveyContext';

interface SurveyConfigProps {
  onStart?: () => void;
}

const SurveyConfig: React.FC<SurveyConfigProps> = () => {
  const { t } = useTranslation();
  const { setUserGender, setPartnerGender, setGameLevel, completeConfig } = useSurvey();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('female');
  const [orientation, setOrientation] = useState('hetero');
  
  const handleStart = () => {
    setLoading(true);
    
    // Ustaw wybrane opcje w kontekście
    setUserGender(gender as 'male' | 'female');
    
    // Ustaw płeć partnera na podstawie orientacji i płci użytkownika
    if (orientation === 'hetero') {
      setPartnerGender(gender === 'male' ? 'female' : 'male');
    } else if (orientation === 'homo') {
      setPartnerGender(gender as 'male' | 'female');
    } else {
      // Dla biseksualistów możemy domyślnie ustawić na płeć przeciwną
      setPartnerGender(gender === 'male' ? 'female' : 'male');
    }
    
    // Ustaw poziom gry na 'discover' (domyślny)
    setGameLevel('discover');
    
    setTimeout(() => {
      completeConfig();
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="glass-card p-8 md:p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('survey.config.title')}</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">{t('survey.config.iAm')}:</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`p-3 rounded-md border ${
                gender === 'female' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              {t('survey.config.female')}
            </button>
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`p-3 rounded-md border ${
                gender === 'male' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              {t('survey.config.male')}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">{t('survey.config.orientation')}:</label>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => setOrientation('hetero')}
              className={`p-3 rounded-md border ${
                orientation === 'hetero' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              {t('survey.config.hetero')}
            </button>
            <button
              type="button"
              onClick={() => setOrientation('homo')}
              className={`p-3 rounded-md border ${
                orientation === 'homo' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              {t('survey.config.homo')}
            </button>
            <button
              type="button"
              onClick={() => setOrientation('bi')}
              className={`p-3 rounded-md border ${
                orientation === 'bi' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border bg-card text-muted-foreground'
              }`}
            >
              {t('survey.config.bi')}
            </button>
          </div>
        </div>
        
        <Button 
          onClick={handleStart} 
          disabled={loading}
          className="w-full py-6 mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {t('survey.question.loading')}
            </>
          ) : (
            t('survey.instruction.startSurvey')
          )}
        </Button>
      </div>
    </div>
  );
};

export default SurveyConfig;
