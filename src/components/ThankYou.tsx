
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface ThankYouProps {
  onRestart: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ onRestart }) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="glass-card p-8 md:p-12 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t('survey.thankYou.thankYouMessage')}
        </h1>
        
        <p className="text-lg mb-10">
          {t('survey.thankYou.answersRecorded')}
        </p>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={onRestart}
          >
            {t('survey.thankYou.fillAgain')}
          </Button>
          
          <Button>
            {t('survey.thankYou.getReport')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
