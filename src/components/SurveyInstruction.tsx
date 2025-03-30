
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, SendIcon, FileTextIcon, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SurveyInstructionProps {
  onStart: () => void;
}

const SurveyInstruction: React.FC<SurveyInstructionProps> = ({ onStart }) => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-12 text-center">
          {t('survey.instruction.title')}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
          <div className="glass-card bg-card/30 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium">{t('survey.instruction.honest.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.honest.description')}
            </p>
          </div>
          
          <div className="glass-card bg-card/30 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium">{t('survey.instruction.discretion.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.discretion.description')}
            </p>
          </div>
          
          <div className="glass-card bg-card/30 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <SendIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium">{t('survey.instruction.invite.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.invite.description')}
            </p>
          </div>
          
          <div className="glass-card bg-card/30 p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <FileTextIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-medium">{t('survey.instruction.report.title')}</h3>
            </div>
            <p className="text-muted-foreground">
              {t('survey.instruction.report.description')}
            </p>
          </div>
        </div>
        
        <div className="w-full p-6 rounded-xl bg-card/20 mb-12">
          <h3 className="text-xl font-medium mb-4">{t('survey.instruction.serviceCost')}</h3>
          <div className="flex justify-between items-center">
            <div className="text-4xl md:text-5xl font-bold text-primary">49 PLN</div>
            <div className="text-muted-foreground">{t('survey.instruction.oneTimePayment')}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 w-full">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm">{t('survey.instruction.features.paymentAfterSurvey')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm">{t('survey.instruction.features.personalizedReport')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm">{t('survey.instruction.features.commonFascinations')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm">{t('survey.instruction.features.scenarios')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm">{t('survey.instruction.features.comfortMap')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm">{t('survey.instruction.features.betterSexLife')}</span>
          </div>
        </div>
        
        <Button className="rounded-full px-8 py-6" size="lg" onClick={onStart}>
          {t('survey.instruction.startSurvey')}
        </Button>
      </div>
    </div>
  );
};

export default SurveyInstruction;
