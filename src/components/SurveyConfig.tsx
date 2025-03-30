
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SurveyConfigProps {
  onStart: () => void;
}

const SurveyConfig: React.FC<SurveyConfigProps> = ({ onStart }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('female');
  const [orientation, setOrientation] = useState('hetero');
  
  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      onStart();
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="glass-card p-8 md:p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Skonfiguruj ankietę</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Jestem:</label>
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
              Kobietą
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
              Mężczyzną
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Orientacja:</label>
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
              Heteroseksualna
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
              Homoseksualna
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
              Biseksualna
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
