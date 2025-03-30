
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, User, Users, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GameLevel } from '@/types/survey';

interface OrderDetails {
  userName: string;
  partnerName: string;
  userGender: 'male' | 'female';
  partnerGender: 'male' | 'female';
  gameLevel: GameLevel;
  orderId?: string;
}

interface PartnerWelcomeProps {
  orderDetails: OrderDetails;
}

const PartnerWelcome: React.FC<PartnerWelcomeProps> = ({ orderDetails }) => {
  const { completeConfiguration } = useSurvey();
  const { t } = useTranslation();
  
  return (
    <div className="glass-panel w-full max-w-lg p-6 md:p-8 animate-slide-up">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-5">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
          {t('partnerWelcome.title')}
        </h1>
        
        <p className="text-center text-muted-foreground mb-6">
          {t('partnerWelcome.subtitle')}
        </p>
        
        <div className="bg-card/30 rounded-xl p-5 w-full mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-3">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('partnerWelcome.invitedBy')}</p>
                <p className="font-medium">{orderDetails.userName}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('partnerWelcome.relationship')}</p>
                <p className="font-medium">{t('partnerWelcome.intimate')}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-3">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('partnerWelcome.level')}</p>
                <p className="font-medium capitalize">
                  {t(`partnerWelcome.levels.${orderDetails.gameLevel}`)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold mb-3">{t('partnerWelcome.instructions.title')}</h2>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li className="flex items-center">
              <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary mr-2 text-xs flex items-center justify-center font-medium">1</span>
              {t('partnerWelcome.instructions.step1')}
            </li>
            <li className="flex items-center">
              <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary mr-2 text-xs flex items-center justify-center font-medium">2</span>
              {t('partnerWelcome.instructions.step2')}
            </li>
            <li className="flex items-center">
              <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary mr-2 text-xs flex items-center justify-center font-medium">3</span>
              {t('partnerWelcome.instructions.step3')}
            </li>
          </ul>
        </div>
        
        <div className="text-center mb-6">
          <div className="w-full p-4 bg-primary/10 rounded-lg">
            <p className="text-sm">{t('partnerWelcome.privacy')}</p>
          </div>
        </div>
        
        <Button 
          onClick={completeConfiguration}
          className="bg-primary text-white px-8 py-2 rounded-full hover:bg-primary/90 transition-colors"
          size="lg"
        >
          {t('partnerWelcome.startButton')}
        </Button>
      </div>
    </div>
  );
};

export default PartnerWelcome;
