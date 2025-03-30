
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSurvey } from '@/contexts/SurveyContext';
import { Heart, CheckCircle, Shield, SendHorizonal, FileText, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SurveyInstruction: React.FC = () => {
  const { completeInstructions } = useSurvey();
  const { t } = useTranslation();
  
  return (
    <div className="glass-panel w-full max-w-4xl p-6 md:p-8 animate-slide-up">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-pink-100 rounded-full mb-4">
          <Heart className="w-7 h-7 md:w-8 md:h-8 text-pink-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t('survey.instruction.title')}</h1>
        
        <div className="my-4 md:my-6 w-full space-y-4 md:space-y-6">
          {/* Instrukcje w formie kroków */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">{t('survey.instruction.honest.title')}</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('survey.instruction.honest.description')}
              </p>
            </div>
            
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">{t('survey.instruction.discretion.title')}</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('survey.instruction.discretion.description')}
              </p>
            </div>
            
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <SendHorizonal className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">{t('survey.instruction.invite.title')}</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('survey.instruction.invite.description')}
              </p>
            </div>
            
            <div className="bg-card/30 p-4 md:p-6 rounded-lg flex flex-col items-start text-left shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2 md:mb-3">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                <h3 className="text-lg md:text-xl font-semibold">{t('survey.instruction.report.title')}</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('survey.instruction.report.description')}
              </p>
            </div>
          </div>
          
          {/* Sekcja z ceną - przeprojektowana dla spójności z sekcją instrukcji */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 md:p-6 rounded-2xl my-4 md:my-6 w-full mx-auto shadow-lg border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-lg md:text-xl font-bold mb-2 text-gradient-primary text-center">{t('survey.instruction.serviceCost')}</h2>
              
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl md:text-4xl font-bold text-primary">29 zł</span>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary ml-2 opacity-80" />
              </div>
              
              <p className="text-xs md:text-sm opacity-90 text-center font-medium mb-4">
                {t('survey.instruction.oneTimePayment')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <div className="flex items-start bg-card/30 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">{t('survey.instruction.features.paymentAfterSurvey')}</span>
                </div>
                <div className="flex items-start bg-card/30 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">{t('survey.instruction.features.personalizedReport')}</span>
                </div>
                <div className="flex items-start bg-card/30 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">{t('survey.instruction.features.commonFascinations')}</span>
                </div>
                <div className="flex items-start bg-card/30 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">{t('survey.instruction.features.scenarios')}</span>
                </div>
                <div className="flex items-start bg-card/30 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">{t('survey.instruction.features.comfortMap')}</span>
                </div>
                <div className="flex items-start bg-card/30 p-2 md:p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground text-left">{t('survey.instruction.features.betterSexLife')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 flex flex-col items-center">
          <Button 
            onClick={completeInstructions} 
            className="px-6 py-2 md:px-8 md:py-6 text-base md:text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            {t('survey.instruction.startSurvey')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyInstruction;
