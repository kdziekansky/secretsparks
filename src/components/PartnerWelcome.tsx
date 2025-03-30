
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface PartnerWelcomeProps {
  onStart: () => void;
  partnerName?: string;
}

const PartnerWelcome: React.FC<PartnerWelcomeProps> = ({ onStart, partnerName = "Twoj partner" }) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="glass-card p-8 md:p-12 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t('survey.partnerWelcome.welcome')}!
        </h1>
        
        <p className="text-xl mb-10">
          <span className="text-primary font-semibold">{partnerName}</span> {t('survey.partnerWelcome.invitedYou')}
        </p>
        
        <div className="mb-10 max-w-xl">
          <p className="text-muted-foreground text-lg">
            {t('survey.partnerWelcome.helpExplanation')}
          </p>
        </div>
        
        <Button 
          onClick={onStart} 
          className="rounded-full px-8 py-6 text-lg"
        >
          {t('survey.partnerWelcome.startSurvey')}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PartnerWelcome;
